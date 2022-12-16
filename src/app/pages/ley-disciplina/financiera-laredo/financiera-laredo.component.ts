import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Archivo } from "../../../models/archivo.model";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-financiera-laredo',
  templateUrl: './financiera-laredo.component.html',
  styleUrls: ['./financiera-laredo.component.css','../../archivos/archivos.scss']
})
export class FinancieraLaredoComponent implements OnInit {
  forma: FormGroup;

  archivo = new Archivo();
  formaArchivo: any;
  formaDatos: any;
  documentos: any = [];
  constructor(private fb: FormBuilder) {
    this.buildForm();
   }

  ngOnInit(): void {
  }

  buildForm() {
    this.forma = this.fb.group({
      nombre: [''],
      numero: [''],
      archivo: [''],
    },
      {
        updateOn: 'change'
      });

  }

  agregarImg(fileList: FileList, tipo: any) {
    console.log('tipo:', tipo);
    const files = Array.from(fileList);
    console.log('files-', files[0].name);
    // this.forma.value.nombre = files[0].name;

    // if (tipo == 1) {
    //   this.NombreArchivo1 = files[0].name;
    // }
    // if (tipo == 2) {
    //   this.NombreArchivo2 = files[0].name;
    // }


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


  agregarRegistro() {
    this.documentos.push(this.archivo);
    console.log('documentos;:', this.documentos);
    console.log('archivo;:', this.archivo);
    // this.archivosService.agregarRegistro(this.forma.value, this.documentos)
    //   .subscribe(resp => {
    //     Swal.fire({
    //       title: 'Éxito',
    //       icon: 'success',
    //       toast: true,
    //       text: 'Archivo agregado',
    //       position: 'top',
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //       .then(resp => {
    //         console.log('registro agregado');
    //         location.reload();
    //         // this.router.navigateByUrl('/atencion');
    //       });
    //   }, err => {
    //     Swal.fire({
    //       title: 'Error',
    //       text: err.error.mensaje,
    //       icon: 'error'
    //     });
    //  })

  }

  

}
