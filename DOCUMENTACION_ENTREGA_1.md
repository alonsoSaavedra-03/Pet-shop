# PetShop · Primera Entrega de Taller
**Curso:** Desarrollo de Aplicaciones Web con Angular  
**Desarrollador:** alonsoSaavedra-03 (https://github.com/alonsoSaavedra-03/Pet-shop)  
**Proyecto:** Sistema de Gestión y Registro de Mascotas, Clientes y Solicitudes de Adopción  

---

## 01. Enunciado Interpretado

### 1.1. Identificación del Problema
Actualmente, la empresa **PetShop** gestiona sus operaciones mediante **formularios físicos en papel**. Este método tradicional presenta múltiples deficiencias:
* **Riesgo de pérdida y deterioro de información**: Dificultad para auditar y conservar el historial clínico y de adopción.
* **Procesos lentos y redundantes**: Registro manual repetitivo sin validación en tiempo real.
* **Falta de trazabilidad y consolidación**: Imposibilidad de obtener indicadores inmediatos sobre mascotas disponibles, clientes registrados y adopciones en trámite.

### 1.2. Objetivo General
Diseñar y construir una aplicación web moderna, interactiva y modular en **Angular**, que reemplace los formularios físicos por interfaces digitales con validación en tiempo real, enlace de datos robusto y un panel de control consolidado (**Dashboard**).

### 1.3. Usuarios del Sistema
1. **Personal Administrativo y de Recepción:** Encargados de dar de alta clientes, registrar nuevas mascotas y mantener la información actualizada.
2. **Coordinadores de Adopción y Veterinarios:** Encargados de evaluar solicitudes de adopción, revisar la compatibilidad de vivienda y actualizar estados (Pendiente, Aprobada, Rechazada).
3. **Gerencia / Dirección de PetShop:** Usuarios que consultan el Dashboard para tomar decisiones estratégicas basadas en indicadores clave (KPIs).

---

## 02. Arquitectura de la Solución

### 2.1. Mapa de Navegación y Rutas
* `/inicio`: Landing page institucional y bienvenida con resumen de estado.
* `/nosotros`: Información corporativa, misión, visión y los 4 pilares de servicios (Venta, Veterinaria, Accesorios, Adopción).
* `/mascotas`: **RF01 & RF02** · Registro de mascotas con Template-Driven Forms (`FormsModule` + `[(ngModel)]`) y catálogo con filtros en vivo.
* `/clientes`: **RF03** · Registro de clientes con validaciones completas (DNI 8 dígitos, teléfono 9 dígitos, email y dirección).
* `/adopciones`: **RF04** · Solicitud de adopción implementada con Reactive Forms (`ReactiveFormsModule`, `FormGroup`, `FormBuilder`, `Validators`) y gestión de estados (Aprobar / Rechazar).
* `/dashboard`: **RF05** · Vista consolidada con indicadores (KPIs), distribución por especies, embudo de solicitudes y últimos registros.

---

## 03. Mockup Estructural de Pantallas

### 3.1. Pantalla 1: Formulario y Catálogo de Mascotas (`/mascotas`)
```text
+------------------------------------------------------------------------------------------+
|  [Logo PetShop]    Inicio | Nosotros | Mascotas (5) | Clientes (3) | Adopciones | Dashboard  |
+------------------------------------------------------------------------------------------+
|  Módulo de Mascotas (Template-Driven Form)                                               |
|                                                                                          |
|  [ Formulario de Registro ]               [ Catálogo y Mascotas en Sistema ]             |
|  +-------------------------------------+  +--------------------------------------------+ |
|  | Nombre*:    [ Max                 ] |  | Buscar: [ Buscar mascota... ] Filtro: [▼] | |
|  | Especie*:   [ Perro             ▼ ] |  +--------------------------------------------+ |
|  | Raza*:      [ Golden Retriever    ] |  | Cód.  | Nombre | Especie | Edad | Estado     | |
|  | Edad*:      [ 2                   ] |  |-------+--------+---------+------+------------| |
|  | Sexo*:      (o) Macho  ( ) Hembra   |  | M-001 | Max    | Perro   | 2 a. | Disponible | |
|  | Estado:     [ Disponible        ▼ ] |  | M-002 | Luna   | Gato    | 1 a. | En adopción| |
|  | Observ.:    [ Muy dócil y juguetón] |  | M-003 | Rocky  | Perro   | 3 a. | Disponible | |
|  |                                     |  +--------------------------------------------+ |
|  | [ Registrar Mascota (btn-primary) ] |  | Acciones: [Cambiar Estado] [Eliminar]      | |
|  +-------------------------------------+  +--------------------------------------------+ |
+------------------------------------------------------------------------------------------+
```

### 3.2. Pantalla 2: Solicitud de Adopción (`/adopciones`)
```text
+------------------------------------------------------------------------------------------+
|  Módulo de Adopciones (Reactive Forms - FormGroup & Validators)                          |
|                                                                                          |
|  [ Nueva Solicitud de Adopción ]           [ Solicitudes Registradas ]                   |
|  +-------------------------------------+   +-------------------------------------------+ |
|  | Cliente Solicitante*: [ Seleccionar▼]   | Filtro: [ Todos los estados ▼ ]           | |
|  | Mascota*:             [ Seleccionar▼]   +-------------------------------------------+ |
|  | Fecha Solicitud*:     [ 2026-09-15  ]   | Cód.    | Solicitante | Mascota  | Estado | |
|  | Tipo Vivienda*:       [ Dpto.     ▼ ]   |---------+-------------+----------+--------| |
|  | Email de Contacto*:   [ user@mail.c ]   | SOL-001 | C. Mendoza  | Luna     | Pend.  | |
|  | Motivo Adopción*:     [ >10 carac...]   | SOL-002 | M. Gómez    | Tambor   | Aprob. | |
|  | Observaciones:        [ Opcional... ]   +-------------------------------------------+ |
|  |                                     |   | Acciones: [✓ Aprobar] [✗ Rechazar] [🗑]  | |
|  | [ Enviar Solicitud (Reactive Form)] |   +-------------------------------------------+ |
|  +-------------------------------------+                                                 |
+------------------------------------------------------------------------------------------+
```

### 3.3. Pantalla 3: Dashboard de Indicadores (`/dashboard`)
```text
+------------------------------------------------------------------------------------------+
|  [KPI: Mascotas (5)]  [KPI: Clientes (3)]  [KPI: Solicitudes (2)]  [Tasa Aprobación: 50%]|
+------------------------------------------------------------------------------------------+
|  [ Estado de Mascotas ]                   [ Embudo de Adopciones ]                       |
|  - Disponibles:  3  [████████░░] 60%      - Pendientes:  1  [████░░░░░░] 50%             |
|  - En Adopción:  1  [████░░░░░░] 20%      - Aprobadas:   1  [████░░░░░░] 50%             |
|  - Adoptadas:    1  [████░░░░░░] 20%      - Rechazadas:  0  [░░░░░░░░░░]  0%             |
|                                                                                          |
|  [ Distribución por Especie ]             [ Protocolo y Resumen Reciente ]               |
|  - Perros: 40% | Gatos: 20% | Aves: 20%   - Registro de últimas altas y adopciones       |
+------------------------------------------------------------------------------------------+
```

---

## 04. Matriz Detallada de Campos y Reglas de Validación

| Formulario | Campo | Tipo de Control | Reglas de Validación | Mensaje de Retroalimentación |
| :--- | :--- | :--- | :--- | :--- |
| **01 · Mascotas** | `nombre` | `<input type="text">` | `required`, `minlength="2"` | "El nombre es requerido y debe contener al menos 2 caracteres." |
| **01 · Mascotas** | `especie` | `<select>` | `required` | "Debe seleccionar una especie válida de la lista." |
| **01 · Mascotas** | `raza` | `<input type="text">` | `required` | "La raza de la mascota es obligatoria." |
| **01 · Mascotas** | `edad` | `<input type="number">` | `required`, `min="0"` | "La edad es obligatoria y debe ser mayor o igual a 0." |
| **01 · Mascotas** | `sexo` | `<input type="radio">` | `required` (`Macho` / `Hembra`) | "Debe seleccionar el sexo de la mascota." |
| **01 · Mascotas** | `estado` | `<select>` | Valor por defecto: `Disponible` | Control de ciclo de vida del animal. |
| **01 · Mascotas** | `descripcion` | `<textarea>` | Opcional | Observaciones de salud o comportamiento. |
| **02 · Clientes** | `nombres` | `<input type="text">` | `required`, `minlength="3"`, sólo letras | "Nombres requeridos (mín. 3 letras sin números)." |
| **02 · Clientes** | `apellidos` | `<input type="text">` | `required`, `minlength="3"`, sólo letras | "Apellidos requeridos (mín. 3 letras)." |
| **02 · Clientes** | `dni` | `<input type="text">` | `required`, `pattern="^[0-9]{8}$"` | "DNI obligatorio de exactamente 8 dígitos." |
| **02 · Clientes** | `telefono` | `<input type="text">` | `required`, `pattern="^[0-9]{9}$"` | "Teléfono obligatorio de 9 dígitos." |
| **02 · Clientes** | `email` | `<input type="email">` | `required`, formato email válido | "Correo electrónico con formato válido requerido." |
| **02 · Clientes** | `direccion` | `<input type="text">` | `required`, `minlength="5"` | "Dirección requerida (mín. 5 caracteres)." |
| **03 · Adopciones** | `clienteId` | `<select>` reactivo | `Validators.required` | "Debe seleccionar un cliente registrado." |
| **03 · Adopciones** | `mascotaId` | `<select>` reactivo | `Validators.required` | "Debe seleccionar la mascota que desea adoptar." |
| **03 · Adopciones** | `fechaSolicitud`| `<input type="date">` | `Validators.required` | "La fecha de la solicitud es obligatoria." |
| **03 · Adopciones** | `tipoVivienda`| `<select>` reactivo | `Validators.required` | "Debe indicar el tipo de vivienda del adoptante." |
| **03 · Adopciones** | `email` | `<input type="email">` | `Validators.required`, `Validators.email` | "Correo de contacto válido obligatorio." |
| **03 · Adopciones** | `motivoAdopcion`| `<textarea>` | `Validators.required`, `Validators.minLength(10)` | "Debe detallar el motivo de adopción (mín. 10 caracteres)." |
| **03 · Adopciones** | `observaciones`| `<textarea>` | Opcional | Datos sobre mallas de seguridad, patio, etc. |

---

## 05. Preparación Técnica: `FormsModule` vs. `ReactiveFormsModule`

| Criterio | Formulario 01 (Mascotas) | Formulario 03 (Solicitudes de Adopción) |
| :--- | :--- | :--- |
| **Enfoque técnico** | **Template-Driven Forms** | **Reactive Forms (Model-Driven)** |
| **Módulo importado** | `@angular/forms` &rarr; `FormsModule` | `@angular/forms` &rarr; `ReactiveFormsModule` |
| **Enlace de datos** | Bidireccional mediante `[(ngModel)]` | Unidireccional e inmutable mediante `FormGroup` y `formControlName` |
| **Definición de validaciones** | Atributos HTML en la plantilla (`required`, `minlength`, `#name="ngModel"`) | Lógica programática en TypeScript (`FormBuilder.group({ control: ['', [Validators.required]] })`) |
| **Gestión de estado** | Administrado implícitamente por directivas de Angular en el DOM | Administrado explícitamente en la clase mediante `FormGroup`, `FormControl` y Streams reactivos |
| **Ventaja clave para el taller** | Simplicidad y rapidez para formularios directos sin lógica compleja | Máximo control, testabilidad y reactividad para flujos de negocio relacionales |
