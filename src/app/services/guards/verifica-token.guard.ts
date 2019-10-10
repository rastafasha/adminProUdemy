import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import { reject } from 'q';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public usuarioService: UsuarioService,
    public router: Router
  ){}

  canActivate(): Promise<boolean> | boolean  {
      
    console.log('Token guard');

    let token = this.usuarioService.token;
    let payload = JSON.parse( atob( token.split('.')[1] ) );

    let expirado = this.expirado(payload.exp);

    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.verificaRenueva( payload.exp);
  }

  verificaRenueva( fechaExp: number ): Promise<boolean> {
    return new Promise( (resolve, reject) =>{
      
      // traemos el token a la fecha presente
      let tokenExp = new Date(fechaExp * 1000);
      let ahora = new Date();

      // sumamos las horas con el primer numero para dar tiempo a que expire (4) se suman 4 horas
      ahora.setTime( ahora.getTime() + ( 4 * 60 * 60 * 1000 ) );

      // console.log(tokenExp);
      // console.log(ahora);

      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);

      } else {
        //esta proximo a vencer y renovamos el token
        this.usuarioService.renuevaToken()
          .subscribe( () => {
            resolve(true);
          }, () => {
            this.router.navigate(['/login']);
            reject(false);
          });
      }

      resolve( true);

    });
  }

  expirado( fechaExp: number) {
    
    let ahora = new Date().getTime() / 1000;

    if(fechaExp < ahora ) {
      return true;
    } else {
      return false;
    }


  }


  
}
