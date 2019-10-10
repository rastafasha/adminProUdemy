import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AdminGuard implements CanActivate  {

  constructor(
    public usuarioService: UsuarioService,
    public router: Router
  ) {}

  canActivate() {
    
    if (this.usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true;
    }else{
      console.log('Bloqueado por el Admin Guard');
      // this.router.navigate(['/login']); //forma alternativa para sacar 
      this.usuarioService.logout();
      return false;
    }

    return true;
  }

  
}
