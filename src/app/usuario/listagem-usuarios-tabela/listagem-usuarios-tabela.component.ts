import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../shared/modelo/usuario';
import {MatTableDataSource} from '@angular/material/table';
import {UsuarioService} from '../../shared/services/usuario.service';
import {Router} from '@angular/router';
import {TelefonePipe} from "../../pipes/pipe/telefone-pipe.pipe";
import {MensagemConsoleService} from "../../shared/services/mensagem-console.service";

@Component({
  selector: 'app-listagem-usuarios-tabela',
  templateUrl: './listagem-usuarios-tabela.component.html',
  styleUrls: ['./listagem-usuarios-tabela.component.css']
})
export class ListagemUsuariosTabelaComponent implements OnInit {
  dataSource: MatTableDataSource<Usuario>;
  mostrarColunas = ['nome', 'cpf', 'idade', 'telefone', 'acoes'];
  telefonePipe: TelefonePipe = new TelefonePipe();

  constructor(private usuarioService: UsuarioService, private roteador: Router, private mensagemService: MensagemConsoleService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.usuarioService.listar().subscribe(
      usuarios => this.dataSource = new MatTableDataSource(usuarios)
    );
  }

  filtrar(texto: string): void {
    this.dataSource.filter = texto.trim().toLowerCase();
  }

  apagar(id: number): void {
    console.log(id)
    this.usuarioService.apagar(id).subscribe(
      apagado => {
        this.mensagemService.alerta(`Usuário ${apagado.nome} removido com sucesso!`)
        const indx = this.dataSource.data.findIndex(usuario => usuario.id === id);
        if (indx > -1) {
          this.dataSource.data.splice(indx, 1);
          this.dataSource = new MatTableDataSource<Usuario>(this.dataSource.data);
        }
      }
    );
  }

  editar(usuario: Usuario): void {
    console.log('editando');
    this.roteador.navigate(['editausuario/', usuario.id]);
  }
}
