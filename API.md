# Cómo funcionan las APIs — Gestor de Opiniones 2024083

El sistema está compuesto por tres microservicios independientes y un contenedor de base datos, cada uno con su propia responsabilidad.

---

## Auth Service

En este servicio de authentication se realiza todo lo relacionado con las cuentas, como el registro, el login, la verificación y la recuperación de contraseña. En este servicio se genera un token de JWT que los otros servicios usan para identficarlo.

## Publication Service

Maneja las publicaciones del sistema. Un usario que ya fue autenticado puede crear publicaciones con un título, categoria y el texto de la publicación. También puede ver las otras publicaciones existentes y buscar alguna en especifico. 

## Comments Service 

Este servicio permite comentar las publicaciones. Un usuario autenticado puede dejar un comentario sobre cualquier publicación, ver los comentarios de la publicación y editar o eliminar sus propios comentarios.

--- 

## Flujo

El usuario se registra y se autentifica, luego inicia sesión y obtiene un token dado por JWT, luego con ese token el es capaz de crear las publicaciones y media vez haya una publicación es capaz de hacer comentarios sobre ellas.

---

## Explicación movimientos de backlog 
Durante el desarrollo del proyecto realicé un ajuste en la planficación, el servicio comment fue movido del sprint 3 al sprint 2, ya que tenía el tiempo disponible para poder trabajarlo durante ese sprint. 

---

## Autor 

Jeremy Martinez - Estudiantes de Kinal, IN6AV