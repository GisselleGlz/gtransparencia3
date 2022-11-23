import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { RUTA_IMG } from 'src/environments/environment';
import { Archivo } from 'src/app/models/archivo.model';
import { ArchivosService } from '../../../services/archivos.service';
@Component({
  selector: 'app-ordenes-dia',
  templateUrl: './ordenes-dia.component.html',
  styleUrls: ['./ordenes-dia.component.css', '../archivos.scss']
})
export class OrdenesDiaComponent implements OnInit {
  idregistro: number = 0;
  // cargo: Cargo = new Cargo()
  archivo = new Archivo();
  formaArchivo: any;
  formaDatos: any;

  mostrarDepartamentoModulo: boolean = false;
  formaOrden: FormGroup;


  playLoad: any;
  textButton: string = 'Agregar';
  tiposUsuario: any[] = new Array;
  idUsuarioActual: any = '';

  tiposSecretarias: any[] = new Array();
  tiposDirecciones: any[] = new Array();
  tiposEmpleos: any[] = new Array();


  documentos: any = [];
  documentos_orden: any = [];
  ruta: any;
  errMsj = null;
  Nombre = '';
  NombreArchivo1: any;
  NombreArchivo2: any;
  tabDefault = 0;
  url: any;
  iddocumento: number = 0;
  btn2 = 0;

  btn1 = 0;
  constructor(private archivosService: ArchivosService, private fb: FormBuilder) {
    this.url = RUTA_IMG;
    this.buildForm();
   this.cargarDatos();
   }

  ngOnInit(): void {
  }
  buildForm() {
    this.formaOrden = this.fb.group({
      sesion: [''],
      fecha: [''],
      numero: [''],
    },
      {
        updateOn: 'change'
      });

  }
  cargarDatos() {

    this.archivosService.getOrden().subscribe(
      data => {
        this.documentos_orden = data.documentos;
        console.log('documentos_orden-', this.documentos_orden);

      },
      err => {
        this.errMsj = err.error.mensaje;
      }
    );
  }
  agregarFile(fileList: FileList, tipo: any) {
    console.log('tipo:', tipo);
    const files = Array.from(fileList);
    console.log('files-', files[0].name);
    // this.forma.value.nombre = files[0].name;

    if (tipo == 1) {
      this.NombreArchivo1 = files[0].name;
    }
    if (tipo == 2) {
      this.NombreArchivo2 = files[0].name;
    }
    // this.forma.patchValue({
    //   nombre: files[0].name,
    // })

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


  agregarOrden() {
    this.documentos.push(this.archivo);
    console.log('documentos;:', this.documentos);
    console.log('archivo;:', this.archivo);
    this.archivosService.agregarOrden(this.formaOrden.value, this.documentos)
      .subscribe(resp => {
        Swal.fire({
          title: 'Éxito',
          icon: 'success',
          toast: true,
          text: 'Archivo Agregado',
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

  editar1(iddoc: number) {
    this.btn1 = 1;
    this.iddocumento = iddoc;
    console.log('iddoc:', this.iddocumento);
  }
  editarOrden(id: number) {
    console.log('id', id);
    this.iddocumento = id;
    const values: FormData = { iddocumento: this.iddocumento, ...this.formaOrden.value }
    this.archivosService.editarOrden(values).subscribe(resp => {
      this
      Swal.fire({
        title: 'Exito',
        text: 'Se edito correctamente',
        icon: 'success',
        toast: true,
        showConfirmButton: false,
        timer: 1500,
        position: 'top',
      })
        .then(resp => {
          window.location.reload()
        });
    },
      err => {
        Swal.fire({
          title: 'Error',
          icon: 'error'
        });

      }
    )
  }


  eliminarOrden(index, imagen) {
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
            .eliminarOrden({ iddocumento: imgTemp.iddocumento })
            .subscribe(
              data => {
                this.documentos_orden.splice(index, 1);
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
      this.documentos_orden.splice(index, 1);
    }
  }
}
