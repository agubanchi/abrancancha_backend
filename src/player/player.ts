import { iPlayer } from "src/player/player.interface";

export class Player /* implements iPlayer */ {
    protected id: number;
    protected nombre: string;
    protected apellido: string;
    protected email: string;
    protected telefono: number;
    protected categoria: number;
    protected avatar: string;

    constructor(apellido: string, nombre: string, email: string, telefono: number
        , categoria: number, avatar: string) {
        this.id = null;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.categoria = categoria;
        this.avatar = avatar;
    }
    public getId(): number { return this.id }
    public getNombre(): string { return this.nombre }
    public getApellido(): string { return this.apellido }
    public getEmail(): string { return this.email }
    public getTelefono(): number { return this.telefono }
    public getCategoria(): number { return this.categoria }
    public getAvatar(): string { return this.avatar }

    public setId(id: number): void { this.id = id }
    public setNombre(nombre: string): void { this.nombre = nombre }
    public setApellido(apellido: string): void { this.apellido = apellido }
    public setEmail(email: string): void { this.email = email }
    public setTelefono(telefono: number): void { this.telefono = telefono }
    public setCategoria(categoria: number): void { this.categoria = categoria }
    public setAvatar(avatar: string): void { this.avatar = avatar }
}
