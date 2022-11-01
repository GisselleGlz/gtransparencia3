import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_WS } from 'src/environments/environment';
import { AgregarData } from '../models/agregarData.model';
import { GetData } from '../models/getData.model';
import { Registro } from '../models/registro.model';

import { map, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  constructor(private http: HttpClient) { }




  // obtenerFormatos() {
  //   const url = URL_WS + '/Formato'

  //   return this.http.post<any>(url, localStorage.getItem('token'))
  //     .pipe(
  //       map((formato) => {
  //         return formato
  //       },
  //         error => {
  //           console.log(error)
  //         })
  //     )
  // }


  obtenerRegistro(idregistro: number) {
     const url = URL_WS + `/Archivos/registro/${idregistro}`;
     return this.http.get(url)
       .pipe(map((resp: GetData) => {
         let formato: Registro = resp.registro;
         const { mensaje, status } = resp;
         const c = { status, mensaje, registro: formato }
         return c;
       }));
   }


  // agregarRegistro(form: FormData) {
  //   const url = URL_WS + '/Archivos/agregar';
  //   const formData: FormData = new FormData();
  //   let i = 1;
  //   formData.append('form', JSON.stringify(form));
  //   return this.http.post<AgregarData>(url, formData)
  //     .pipe(map((resp: AgregarData) => resp));
  // }

   getTicket(idregistro: any) {
     const url = URL_WS + `/Archivos/registroimg/${idregistro}`;
     return this.http.get(url).pipe(map((resp: any) => {
       return resp;
     }));
   }

  agregarRegistro(forma: any,documentos: any[]) {
     const url = URL_WS + "/Archivos/agregar";
     const formData = new FormData();
     formData.append("data", JSON.stringify(forma));
     let x = 1;
     for (const doc of documentos) {
       const name = `documento_${x}`;
       formData.append(name, doc.archivo);
       x++;
     }
     return this.http.post(url, formData).pipe(map((resp: any) => {
       return resp;
     }));
   }


   eliminarDocumento(data: any) {
     const url = URL_WS + "/Archivos/eliminar_doc";
     return this.http.post(url, data).pipe(map((resp: any) => {
       return resp;
     }));
   }

  paginado(limit: number, page: number, filtros, order) {
    const url = URL_WS + "/Archivos/registrospag";
    return this.http.post(url, { limit, offset: (page - 1) * limit, filtros, order }).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

}
