import { UsuariosService } from '../../../../services/configuration/usuarios.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AlertasService } from 'src/app/shared/services/alertas.service';
import { CambiarEstadoService } from 'src/app/shared/services/cambiar-estado.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  usuarios: any[] = new Array()
  idUsuario;
  filtro = new Subject<string>(); 

  filtros = [];
  order = [];
  total = 0;
  page = 1;
  limit = 10;
  errMsj = null;
  varaux: any;

  
  constructor
  (
    private router: Router, 
    private usuariosService: UsuariosService,
    private authService: AuthService,
    private _alertasService: AlertasService,
    private _cambiarEstadoService: CambiarEstadoService
  ) 
  {
    this.filtro.pipe(debounceTime(800)).subscribe(() => {
      this.paginado();
    });
    

    this.filtros = [
      {
        col: 'idusuario',
        param: '',
        type: 'number',
      },
      {
        col: 'nombre',
        param: '',
        type: 'string',
      },
      {
        col: 'correo',
        param: '',
        type: 'string',
      },

      {
        col: 'activo',
        param: '',
        type: 'string',
      }
    ];

    this.order = [
      {
        orderBy: 'idusuario',
        direction: 'desc'
      }
    ];

    this.paginado();
   }

   changeOrder(fil: string, direction:string) {
    this.varaux = fil;
    this.order = [
      {
        orderBy: this.varaux,
        direction: direction
      }]
    this.paginado();
  }

  ngOnInit(): void { this.idUsuario = this.authService.getPlayLoad().datos.idusuario; }
  
  paginado() {
    this.usuariosService.paginado(this.limit, this.page, this.filtros, this.order)
      .subscribe(
        (data) => {
          this.usuarios = data.registros;
          this.total = data.total;
        }
      );
  }

  cambiarEstado(nombre: string, estado: number, idUsuario: number)
  {
    this._alertasService.mostrarMensajeCambioEstado(nombre, estado, (confirmo) => {
        if(confirmo)
        {
        //  console.log('nombre:', nombre, 'estado: ', estado);
            this._cambiarEstadoService.cambiar('usuarios', idUsuario, estado).subscribe(
              respuesta => {
                  this._alertasService.mostrarMensajeToast('Éxito', respuesta, 'success')
                  this.paginado();
              }
            )
        }
    })
  }

  swalToastOpen(): typeof Swal {
    const toast = Swal.mixin({
      title: 'Éxito',
      text: 'Se cambio el estado',
      icon: 'success',
      toast: true,
      showConfirmButton: false,
      timer: 2000,
      position: 'top'
    })
    return toast;
  }
}
