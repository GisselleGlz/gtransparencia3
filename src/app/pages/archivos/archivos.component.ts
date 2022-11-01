import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormControlName, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Archivo } from "../../models/archivo.model";
import { ArchivosService } from '../../services/archivos.service';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css', './archivos.scss']
})
export class ArchivosComponent implements OnInit {
  idregistro: number = 0;
  // cargo: Cargo = new Cargo()
  archivo = new Archivo();
  formaArchivo:any;
  formaDatos:any;

  mostrarDepartamentoModulo: boolean = false;
  forma: FormGroup;

  playLoad: any;
  textButton: string = 'Agregar';
  tiposUsuario: any[] = new Array;
  idUsuarioActual: any = '';

  tiposSecretarias: any[] = new Array();
  tiposDirecciones: any[] = new Array();
  tiposEmpleos: any[] = new Array();


  documentos: any = [];
  ruta: any;
  errMsj = null;
  Nombre = '';
  NombreArchivo:any;
  tabDefault = 0;
  constructor(private archivosService: ArchivosService, private fb: FormBuilder) {
    this.buildForm();
    this.cargarDatos();
   }

  ngOnInit(): void {
  }

  buildForm() {
    this.forma = this.fb.group({
    //  idregistro: this.idregistro,
      // activo: [1],
      nombre: [''],
    },
      {
        updateOn: 'change'
      });
  }

  agregarImg(fileList: FileList) {
    const files = Array.from(fileList);
    console.log('files-', files[0].name);
    this.forma.value.nombre = files[0].name;
    this.NombreArchivo = files[0].name;
    this.forma.patchValue({
      nombre: files[0].name,
    })

    let invalido = false;
    let vacio = false;
    if (this.documentos.length < 1) {
      vacio = true;
    }

   // this.formaArchivo.documentos = files;
   // console.log('doc-', this.formaArchivo.documentos);

    files.forEach(f => {
      if (
        f.type != "image/jpeg" &&
        f.type != "image/jpg" &&
        f.type != "application/pdf" &&
        f.type != "image/png"
      ) {
        Swal.fire(
          "Error",
          "Solo se permiten documentos .png,  .jpg, .pdf",
          "error"
        );
        invalido = true;
        return;
      }
    });

    if (invalido) {
      return;
    }

    files.forEach(file => {
      if (file.type != "application/pdf") {
        
         this.archivo = new Archivo();
        const reader = new FileReader();
        reader.onload = e => {
          this.archivo.ruta = reader.result;
        };
        reader.readAsDataURL(file);
        this.archivo.archivo = file;
        this.archivo.type = file.type;
        //this.documentos.push(archivo);
      } else {
        this.archivo = new Archivo();
        this.archivo.type = file.type;
        this.archivo.archivo = file;
       // this.documentos.push(archivo);
      }
    });
  }


  cargarDatos() {
    this.archivosService.getTicket(this.idregistro).subscribe(
      data => {
       this.formaDatos = data.registro;
        this.documentos = data.documentos;
        this.Nombre = this.formaDatos.nombre
        console.log('doc-', this.formaDatos);
        console.log('Nombre-', this.Nombre);
      //  this.forma.patchValue(data.registro);
        //this.cambioDireccion();
      },
      err => {
        this.errMsj = err.error.mensaje;
      }
    );
  }


  abrirArchivo(documento) {
    if (documento.ruta == '') {
      const file = documento.archivo;
      const reader = new FileReader();
      reader.onload = e => {
        this.ruta = reader.result;
        const pdfWindow = window.open("");
        pdfWindow.document.write("<iframe width='100%' height='100%' src='" + encodeURI(this.ruta) + "'></iframe>");
      };
      reader.readAsDataURL(file);
    } else {
      const pdfWindow = window.open("");
      pdfWindow.document.write("<iframe width='100%' height='100%' src='" + encodeURI(documento.ruta) + "'></iframe>");
    }
  }


  agregarRegistro() {
    this.documentos.push(this.archivo);
console.log('documentos;:', this.documentos);
    console.log('archivo;:', this.archivo);
    this.archivosService.agregarRegistro( this.forma.value, this.documentos)
        .subscribe(resp => {
          Swal.fire({
            title: 'Éxito',
            icon: 'success',
            toast: true,
            text: 'Registro editado',
            position: 'top',
            showConfirmButton: false,
            timer: 1500
          })
            .then(resp => {
              console.log('registro agregado');
              location.reload();
             // this.router.navigateByUrl('/atencion');
            });
        }, err => {
          Swal.fire({
            title: 'Error',
            text: err.error.mensaje,
            icon: 'error'
          });
        })
   
      }


  eliminarDocumento(index, imagen) {
    const imgTemp = imagen;

    if (imgTemp.guardado == 1) {
      Swal.fire({
        title: "Aviso",
        text: "Confirmar eliminar el archivo",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        showLoaderOnConfirm: true,
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.archivosService
            .eliminarDocumento({ iddocumento: imgTemp.iddocumento })
            .subscribe(
              data => {
                this.documentos.splice(index, 1);
                Swal.fire({
                  title: 'Éxito',
                  icon: 'success',
                  toast: true,
                  text: 'Archivo eliminado',
                  position: 'top',
                  showConfirmButton: false,
                  timer: 1500
                })
                location.reload();
              },
              err => {
                this.errMsj = err.error.mensaje;
              }
            );
        }
      });
    } else {
      this.documentos.splice(index, 1);
    }
  }

}
