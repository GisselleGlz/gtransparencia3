import { AbstractControl, Validators, ValidationErrors, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { UsuariosService } from 'src/app/services/configuration/usuarios.service';

import { timer, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RegistroService } from '../../services/registro.service';
export class Validations
{

    static existeCorreoValidator(usuariosService: UsuariosService) {
        return (control: AbstractControl): Observable<ValidationErrors> => {
            return timer(800).pipe(
                switchMap(() => {
                    if (!control.value) {
                        return of(null);
                    }
                    const idusuario = control.parent.get('idusuario').value;
                    return usuariosService.existe_correo(control.value, idusuario).pipe(
                        map(resultado => (resultado ? { correoDuplicado: true } : null))
                    );
                })
            );
        };
    }

    static CorreoValidator(registroService: RegistroService) {
        return (control: AbstractControl): Observable<ValidationErrors> => {
            return timer(800).pipe(
                switchMap(() => {
                    if (!control.value) {
                        return of(null);
                    }
                    const idusuario = control.parent.get('idusuario').value;
                    return registroService.correo(control.value, idusuario).pipe(
                        map(resultado => (resultado ? { correoDuplicado: true } : null))
                    );
                })
            );
        };
    }

    static requiredIfValidator(predicate, value, tipo = "==") {
        //predicate es el nombre del control que pertenece al grupo de controles
        //value es el valor esperado a buscar
        //form control es el control al que se le agrega el required
        return (formControl => {
            if (!formControl.parent) {
                return null;
            }
            const condition = {
                "==": formControl.parent.controls[predicate].value == value,
                ">": formControl.parent.controls[predicate].value > value,
                "<": formControl.parent.controls[predicate].value < value,
                "<=": formControl.parent.controls[predicate].value <= value,
                ">=": formControl.parent.controls[predicate].value >= value
            };
            if (condition[tipo]) {
                return Validators.required(formControl);
            }
            return null;
        })
    }

    static match(firstControlName, secondControlName, customError = 'mismatch') {
        return (fg: FormGroup) => {
            return fg.get(firstControlName).value === fg.get(secondControlName).value ? null : { [customError]: true };
        };
    }



    // static validateCorreo(usuariosService: UsuariosService, nuevo: number, idUsuario: number) {

    //     const funcion = (control: AbstractControl) => {
    //         const correo = control.value;
    //         return usuariosService.existeCorreo(correo, nuevo, idUsuario)
    //             .pipe(
    //                 map(resp => {
    //                     return (resp.emailRegistrado) ? { notEmailAvailable: true } : null;
    //                 }),
    //             )
    //     };
    //     return funcion
    // }
} 