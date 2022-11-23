import { Component, OnInit } from '@angular/core';
import {  FormGroup,  FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Archivo } from "../../models/archivo.model";
import { ArchivosService } from '../../services/archivos.service';
import { RUTA_IMG } from 'src/environments/environment';
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
  formaAdquisiciones: FormGroup;

  playLoad: any;
  textButton: string = 'Agregar';
  tiposUsuario: any[] = new Array;
  idUsuarioActual: any = '';

  tiposSecretarias: any[] = new Array();
  tiposDirecciones: any[] = new Array();
  tiposEmpleos: any[] = new Array();


  documentos: any = [];
  documentos_adquisiciones: any = [];
  ruta: any;
  errMsj = null;
  Nombre = '';
  NombreArchivo1:any;
  NombreArchivo2: any;
  tabDefault = 0;
  url: any;
  iddocumento: number = 0;
btn2=0;

  btn1 = 0;
  constructor(private archivosService: ArchivosService, private fb: FormBuilder) {
    this.url = RUTA_IMG; 
    this.buildForm();
    this.cargarDatos();
   }

  ngOnInit(): void {
  }

  buildForm() {
    this.forma = this.fb.group({
      nombre: [''],
      numero: [''],
    },
      {
        updateOn: 'change'
      });


    this.formaAdquisiciones = this.fb.group({
      nombre: [''],
      numero: [''],
    },
      {
        updateOn: 'change'
      });
  }

  agregarImg(fileList: FileList, tipo:any) {
    console.log('tipo:', tipo);
    const files = Array.from(fileList);
    console.log('files-', files[0].name);
    // this.forma.value.nombre = files[0].name;
     
     if(tipo==1){
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


  cargarDatos() {
    this.archivosService.getObras().subscribe(
      data => {
       this.formaDatos = data.registro;
        this.documentos = data.documentos;
        console.log('doc-', this.documentos);
      },
      err => {
        this.errMsj = err.error.mensaje;
      }
    );


    this.archivosService.getAdquisicion().subscribe(
      data => {
        this.documentos_adquisiciones = data.documentos;
        console.log('documentos_adquisiciones-', this.documentos_adquisiciones);

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
            text: 'Archivo agregado',
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

      editar2(iddoc:number){
       this.btn2=1;
       this.iddocumento = iddoc;
       console.log('iddoc:', this.iddocumento);
      }


  editarObra(id: number) {
    console.log('id', id);
    this.iddocumento = id;
    const values: FormData = { iddocumento: this.iddocumento, ...this.forma.value }
    this.archivosService.editarObra(values).subscribe(resp => {
      this
      Swal.fire({
        title: 'Exito',
        text: 'Se edito  correctamente',
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

  editarAdquisicion(id: number) {
    console.log('id', id);
    this.iddocumento = id;
    const values: FormData = { iddocumento: this.iddocumento, ...this.formaAdquisiciones.value }
    this.archivosService.editarAdquisicion(values).subscribe(resp => {
      this
      Swal.fire({
        title: 'Exito',
        text: 'Se edito  correctamente',
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

  agregarAdquisicion() {
    this.documentos.push(this.archivo);
    console.log('documentos;:', this.documentos);
    console.log('archivo;:', this.archivo);
    this.archivosService.agregarAdquisicion(this.formaAdquisiciones.value, this.documentos)
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



  eliminarAdquisicion(index, imagen) {
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
            .eliminarAdquisicion({ iddocumento: imgTemp.iddocumento })
            .subscribe(
              data => {
                this.documentos_adquisiciones.splice(index, 1);
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
      this.documentos_adquisiciones.splice(index, 1);
    }
  }

}



