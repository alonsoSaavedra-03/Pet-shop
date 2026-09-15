const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

// Load original template docx
const zip = new AdmZip(path.join(__dirname, 'template.docx'));
let docXml = zip.readAsText('word/document.xml');

// 1. Modificar Portada / Datos Generales
docXml = docXml.replace(
  /<w:t xml:space="preserve">CFP\/UCP\/ESCUELA: <\/w:t>/,
  '<w:t xml:space="preserve">CFP/UCP/ESCUELA: ESCUELA DE TECNOLOGÍAS DE LA INFORMACIÓN</w:t>'
);

docXml = docXml.replace(
  /<w:t xml:space="preserve">ESTUDIANTE: <\/w:t>/,
  '<w:t xml:space="preserve">ESTUDIANTE: ALONSO SAAVEDRA (alonsoSaavedra-03)</w:t>'
);

docXml = docXml.replace(
  /<w:t xml:space="preserve">CARRERA: <\/w:t>/,
  '<w:t xml:space="preserve">CARRERA: PROGRAMACIÓN Y ARQUITECTURA WEB (PAWD)</w:t>'
);

docXml = docXml.replace(
  /<w:t xml:space="preserve">INSTRUCTOR: <\/w:t>/,
  '<w:t xml:space="preserve">INSTRUCTOR: LUQUE CHAMBI JORGE</w:t>'
);

docXml = docXml.replace(
  /<w:t xml:space="preserve">SEMESTRE: <\/w:t>/,
  '<w:t xml:space="preserve">SEMESTRE: IV SEMESTRE</w:t>'
);

docXml = docXml.replace(
  /<w:t xml:space="preserve"> DEL: <\/w:t>/,
  '<w:t xml:space="preserve"> DEL: 18/08/2026 </w:t>'
);

docXml = docXml.replace(
  /<w:t xml:space="preserve"> AL: <\/w:t>/,
  '<w:t xml:space="preserve"> AL: 11/09/2026 </w:t>'
);

// 2. Modificar Plan de Rotaciones (Tabla 2)
docXml = docXml.replace(
  /<w:p w14:paraId="335C2C3B"[\s\S]*?<\/w:tc>/,
  `<w:p w14:paraId="335C2C3B" w14:textId="77777777" w:rsidR="001B4207" w:rsidRPr="00AA2A9B" w:rsidRDefault="001B4207" w:rsidP="00781A62"><w:pPr><w:spacing w:line="300" w:lineRule="auto"/><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="18"/><w:lang w:val="es-MX"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/><w:lang w:val="es-MX"/></w:rPr><w:t>DESARROLLO DE SOFTWARE / LABORATORIO WEB (ANGULAR)</w:t></w:r></w:p></w:tc>`
);

docXml = docXml.replace(
  /<w:p w14:paraId="5F5559E0"[\s\S]*?<\/w:tc>/,
  `<w:p w14:paraId="5F5559E0" w14:textId="77777777" w:rsidR="001B4207" w:rsidRPr="00AA2A9B" w:rsidRDefault="001B4207" w:rsidP="00781A62"><w:pPr><w:spacing w:line="300" w:lineRule="auto"/><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="18"/><w:lang w:val="es-MX"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/><w:lang w:val="es-MX"/></w:rPr><w:t>18/08/2026</w:t></w:r></w:p></w:tc>`
);

docXml = docXml.replace(
  /<w:p w14:paraId="6865C6CE"[\s\S]*?<\/w:tc>/,
  `<w:p w14:paraId="6865C6CE" w14:textId="77777777" w:rsidR="001B4207" w:rsidRPr="00AA2A9B" w:rsidRDefault="001B4207" w:rsidP="00781A62"><w:pPr><w:spacing w:line="300" w:lineRule="auto"/><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="18"/><w:lang w:val="es-MX"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/><w:lang w:val="es-MX"/></w:rPr><w:t>11/09/2026</w:t></w:r></w:p></w:tc>`
);

docXml = docXml.replace(
  /<w:p w14:paraId="2388C446"[\s\S]*?<\/w:tc>/,
  `<w:p w14:paraId="2388C446" w14:textId="77777777" w:rsidR="001B4207" w:rsidRPr="00AA2A9B" w:rsidRDefault="001B4207" w:rsidP="00781A62"><w:pPr><w:spacing w:line="300" w:lineRule="auto"/><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="18"/><w:lang w:val="es-MX"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/><w:lang w:val="es-MX"/></w:rPr><w:t>4</w:t></w:r></w:p></w:tc>`
);

// 3. Datos estructurados de las 4 semanas
const SEMANAS_DATA = [
  {
    num: '01',
    fechaInicio: '18/08/2026',
    fechaFin: '22/08/2026',
    tareaTitulo: 'TAREA 1 · Fundamentos de Desarrollo Web y Configuración del Entorno en Angular',
    repositorio: 'https://github.com/alonsoSaavedra-03/tarea-1',
    despliegue: 'Ejecución en servidor de desarrollo local (http://localhost:4200)',
    martes: [
      'Horario: 12:45 PM a 5:30 PM (5 Horas académicas / 4.75 hrs cronológicas).',
      'Configuración y preparación del entorno de desarrollo: Verificación de instalación de Node.js v24 y gestor npm.',
      'Instalación global de Angular CLI mediante npm install -g @angular/cli.',
      'Creación del primer proyecto base tarea-1 mediante npx @angular/cli new tarea-1.',
      'Exploración y análisis de la estructura de carpetas: src/app, main.ts, estilos globales y tsconfig.',
      'Fundamentos de componentes Standalone: decorador @Component, selector, plantilla HTML y estilos SCSS.'
    ],
    viernes: [
      'Horario: 7:00 AM a 1:15 PM (6 Horas académicas / 6.25 hrs cronológicas).',
      'Maquetación y estructura de la interfaz de usuario con HTML5 semántico y CSS responsivo.',
      'Implementación del enlace de datos unidireccional: Interpolación de variables {{ }} y Property Binding [propiedad].',
      'Captura y respuesta a eventos de usuario mediante Event Binding (click).',
      'Pruebas de compilación en servidor de desarrollo local (ng serve) en localhost:4200.',
      'Inicialización de repositorio Git, configuración de credenciales, commit inicial y publicación en GitHub: https://github.com/alonsoSaavedra-03/tarea-1.'
    ],
    tareaSignificativa: 'Configuración inicial del entorno de desarrollo y construcción del proyecto inicial con enlace de datos en Angular (Tarea 1).',
    pasos: [
      '1. Verificación del entorno: Comprobación de versiones en la terminal (node -v y npm -v).',
      '2. Inicialización del proyecto: Creación del espacio de trabajo con npx @angular/cli new tarea-1 con estilos SCSS.',
      '3. Creación de componentes: Generación de componentes independientes empleando la arquitectura Standalone sin NgModules.',
      '4. Enlace de datos: Declaración de variables y propiedades en el componente TypeScript y enlace dinámico en la plantilla HTML con {{ }}.',
      '5. Manejo de eventos: Programación de métodos manejadores de clic (click)="onAccion()" para actualizar el estado en pantalla.',
      '6. Estilización modular: Maquetación con CSS Flexbox asegurando un diseño limpio y adaptable.',
      '7. Control de versiones: Configuración de Git, creación de commits y publicación en el repositorio remoto GitHub.'
    ],
    normas: 'Normas de seguridad y ergonomía: Mantenimiento de postura ergonómica con columna recta y pies apoyados en el suelo, descansos visuales preventivos cada 50 minutos, cuidado y orden en los cables de alimentación del laboratorio y apagado correcto de los equipos.',
    diagrama: `+--------------------------------------------------------------------------------+
|                        ARQUITECTURA DEL PROYECTO TAREA 1                       |
+--------------------------------------------------------------------------------+
|                                                                                |
|   [ Entorno de Desarrollo ]                                                    |
|        Node.js v24 + npm + Angular CLI 18+                                     |
|                 │                                                              |
|                 ▼                                                              |
|   [ Componente Standalone (App) ]                                              |
|        ├── Modelo / Lógica (app.ts): variables y métodos                       |
|        ├── Plantilla (app.html): Interpolación {{ }} y Eventos (click)         |
|        └── Estilos (app.scss): CSS Flexbox y fuentes del sistema               |
|                 │                                                              |
|                 ▼                                                              |
|   [ Control de Versiones: Git & GitHub ]                                       |
|        https://github.com/alonsoSaavedra-03/tarea-1                            |
|                                                                                |
+--------------------------------------------------------------------------------+`
  },
  {
    num: '02',
    fechaInicio: '25/08/2026',
    fechaFin: '29/08/2026',
    tareaTitulo: 'TAREA 2 · Plataforma Campus-Edu: Manejo de Arreglos, Filtros Dinámicos y Cotizador de Cursos',
    repositorio: 'https://github.com/alonsoSaavedra-03/campus-edu',
    despliegue: 'https://campus-edu-beta.vercel.app/inicio',
    martes: [
      'Horario: 12:45 PM a 5:30 PM (5 Horas académicas / 4.75 hrs cronológicas).',
      'Análisis de requerimientos para el campus educativo virtual de compra y consulta de cursos.',
      'Modelado de datos en TypeScript: Creación de la interfaz Curso (id, titulo, descripcion, precio, categoria, imagen, horas).',
      'Almacenamiento de colecciones de datos en memoria mediante arreglos (arrays) de objetos estructurados.',
      'Implementación de métodos de array de orden superior: filter(), map(), find() y reduce().',
      'Renderizado dinámico de tarjetas de cursos utilizando la directiva de control de flujo @for de Angular.'
    ],
    viernes: [
      'Horario: 7:00 AM a 1:15 PM (6 Horas académicas / 6.25 hrs cronológicas).',
      'Implementación de barra de búsqueda en tiempo real con filtrado de strings sobre el arreglo de cursos.',
      'Desarrollo de selector dinámico de categorías académicas (Desarrollo Web, Cloud, Ciberseguridad, IA).',
      'Programación del módulo cotizador: Selección de cursos, cálculo aritmético de subtotales, descuentos y total a pagar.',
      'Maquetación responsiva con Bootstrap 5 y diseño de cuadrícula con tarjetas informativas.',
      'Compilación de producción (ng build) y despliegue continuo en Vercel (https://campus-edu-beta.vercel.app/inicio).'
    ],
    tareaSignificativa: 'Desarrollo de plataforma educativa con manipulación de colecciones en arreglos, filtros dinámicos y módulo de cotización (Campus Edu).',
    pasos: [
      '1. Modelado de interfaces: Creación de curso.model.ts definiendo tipado estricto para cada propiedad del curso.',
      '2. Catálogo de datos: Inicialización del arreglo con la información detallada de los cursos disponibles.',
      '3. Programación de filtros: Creación de getters computados que aplican Array.filter() según la búsqueda de texto.',
      '4. Filtrado por categoría: Integración de botones y selector para filtrar cursos según especialidad tecnológica.',
      '5. Módulo cotizador: Implementación de funciones matemáticas que acumulan el costo de los cursos seleccionados.',
      '6. Diseño responsivo: Estructuración de tarjetas en cuadrícula CSS/Bootstrap adaptables a móviles y escritorio.',
      '7. Despliegue en la nube: Configuración de Vercel CLI para compilación y hosting en servidor productivo.'
    ],
    normas: 'Normas de seguridad y ergonomía: Regulación de brillo del monitor para evitar fatiga ocular, respaldo regular del código fuente en GitHub para evitar pérdida de avances, optimización del consumo eléctrico en el taller y uso adecuado de periféricos.',
    diagrama: `+--------------------------------------------------------------------------------+
|                        ARQUITECTURA DE DATOS: CAMPUS-EDU                       |
+--------------------------------------------------------------------------------+
|                                                                                |
|   [ Catálogo de Cursos (Array de Objetos) ]                                    |
|        ├── Curso 1: Angular Avanzado   [Precio: S/. 180 | Cat: Frontend]       |
|        ├── Curso 2: Node.js Backend    [Precio: S/. 200 | Cat: Backend]        |
|        └── Curso 3: Ciberseguridad     [Precio: S/. 220 | Cat: Seguridad]      |
|                 │                                                              |
|                 ▼                                                              |
|   [ Filtros Dinámicos ]  <─── Input Búsqueda / Selector de Categoría           |
|        cursosFiltrados = cursos.filter(c => coincideTexto && coincideCat)      |
|                 │                                                              |
|                 ▼                                                              |
|   [ Módulo Cotizador ]  ───> Sumatoria total con reduce()                      |
|                                                                                |
|   [ Despliegue Vercel ]  ───> https://campus-edu-beta.vercel.app/inicio        |
+--------------------------------------------------------------------------------+`
  },
  {
    num: '03',
    fechaInicio: '01/09/2026',
    fechaFin: '05/09/2026',
    tareaTitulo: 'TAREA EXTRA · Empresa Ficticia: Arquitectura de Navegación con Angular Router y Módulo de Servicios',
    repositorio: 'https://github.com/alonsoSaavedra-03/app-route-saavedra',
    despliegue: 'https://app-route-saavedra.vercel.app/home',
    martes: [
      'Horario: 12:45 PM a 5:30 PM (5 Horas académicas / 4.75 hrs cronológicas).',
      'Fundamentos del enrutamiento Single Page Application (SPA) con el paquete @angular/router.',
      'Definición del mapa de rutas en app.routes.ts para las secciones: /home, /about, /service y /contact.',
      'Configuración del proveedor provideRouter(routes) en app.config.ts.',
      'Creación de componentes de vista independientes para cada página.',
      'Integración de la directiva de salida <router-outlet> en el componente raíz.'
    ],
    viernes: [
      'Horario: 7:00 AM a 1:15 PM (6 Horas académicas / 6.25 hrs cronológicas).',
      'Construcción de barra de navegación interactiva (Navbar) con routerLink y routerLinkActive="active".',
      'Desarrollo del módulo de Servicios (/service): Catálogo de cursos para compra y visualización de detalles.',
      'Configuración de redirección inicial (path: "", redirectTo: "home") y ruta comodín (path: "**").',
      'Optimización de carga con lazy loading mediante importación dinámica loadComponent.',
      'Pruebas de navegación sin recarga de página y despliegue a producción en Vercel: https://app-route-saavedra.vercel.app/home.'
    ],
    tareaSignificativa: 'Implementación del sistema de navegación multipágina SPA con Angular Router y módulo de servicios (App Route Saavedra).',
    pasos: [
      '1. Configuración de rutas: Declaración de rutas hijas en app.routes.ts para /home, /about, /service y /contact.',
      '2. Vistas modulares: Creación de componentes independientes para cada página con diseño de marca.',
      '3. Barra de navegación: Implementación del menú superior con routerLink para transiciones SPA sin recarga.',
      '4. Módulo Service: Incorporación de catálogo de cursos interactivo para solicitud y compra de servicios.',
      '5. Manejo de errores 404: Configuración de ruta comodín ** para redireccionar automáticamente a /home.',
      '6. Optimización de rendimiento: Configuración de lazy loading para carga diferida de paquetes de código.',
      '7. Pruebas y despliegue: Verificación de navegación fluida y publicación en Vercel y GitHub.'
    ],
    normas: 'Normas de seguridad y ergonomía: Mantenimiento del orden y limpieza en la mesa de trabajo, protección de la integridad de los equipos de cómputo, postura ergonómica adecuada frente al teclado y respeto de normas de convivencia en el taller SENATI.',
    diagrama: `+--------------------------------------------------------------------------------+
|                   ÁRBOL DE NAVEGACIÓN: APP-ROUTE-SAAVEDRA                      |
+--------------------------------------------------------------------------------+
|                                                                                |
|                        [ Navbar: Menú de Navegación ]                          |
|         routerLink="/home"   routerLink="/about"   routerLink="/service"       |
|                                     │                                          |
|                                     ▼                                          |
|                         [ <router-outlet> ]                                    |
|                                     │                                          |
|        ┌────────────────┬───────────┴────────────────┬────────────────┐        |
|        ▼                ▼                            ▼                ▼        |
|   /home            /about                       /service          /contact     |
| (Bienvenida)   (Información)                 (Catálogo Cursos)  (Contacto)     |
|                                                                                |
|   [ Despliegue Vercel ]  ───> https://app-route-saavedra.vercel.app/home       |
+--------------------------------------------------------------------------------+`
  },
  {
    num: '04',
    fechaInicio: '08/09/2026',
    fechaFin: '12/09/2026',
    tareaTitulo: 'TAREA 3 · PetShop: Formularios Template-Driven, Formularios Reactivos, Validaciones y Dashboard Ejecutivo',
    repositorio: 'https://github.com/alonsoSaavedra-03/Pet-shop',
    despliegue: 'https://pet-shop-eight-sigma.vercel.app/inicio',
    martes: [
      'Horario: 12:45 PM a 5:30 PM (5 Horas académicas / 4.75 hrs cronológicas).',
      'Análisis del escenario empresarial de PetShop: Modernización y reemplazo de registros físicos en papel.',
      'Configuración de arquitectura de 6 rutas: /inicio, /nosotros, /mascotas, /clientes, /adopciones y /dashboard.',
      'Formulario 01 (Mascotas): Implementado con Template-Driven Forms (FormsModule y [(ngModel)]).',
      'Validaciones obligatorias en Mascotas: Nombre (mín. 2 car.), Especie (select), Raza, Edad (>= 0), Sexo (radio).',
      'Formulario 02 (Clientes): Captura validada de nombres, apellidos, DNI (8 dígitos), teléfono (9 dígitos) y email.',
      'Catálogo interactivo con soporte de fotos en miniatura y filtros de búsqueda en vivo.'
    ],
    viernes: [
      'Horario: 7:00 AM a 1:15 PM (6 Horas académicas / 6.25 hrs cronológicas).',
      'Formulario 03 (Adopciones): Implementado con Reactive Forms (ReactiveFormsModule, FormGroup, FormBuilder y Validators).',
      'Vinculación relacional de clientes y mascotas disponibles, validación de motivo (mín. 10 car.) y vivienda.',
      'Construcción del Dashboard (RF05) con Angular Signals: KPIs en tiempo real, distribución por especies y embudo de adopción.',
      'Lógica de cambio de estados: Al aprobar adopción, la mascota se marca automáticamente como Adoptada.',
      'Estilización sobria (paleta plomo, negro, gris con 10% azul cobalto de resalte).',
      'Pruebas unitarias completas con vitest, compilación y despliegue en Vercel (https://pet-shop-eight-sigma.vercel.app/inicio).'
    ],
    tareaSignificativa: 'Desarrollo integral del sistema PetShop combinando formularios Template-Driven y Reactive Forms con validaciones estrictas y Dashboard consolidado.',
    pasos: [
      '1. Servicio centralizado: Creación de PetShopService con Angular Signals y persistencia en localStorage.',
      '2. Formulario Template-Driven: Integración de FormsModule en MascotasComponent con variables #mascotaForm="ngForm" y control de errores con touched.',
      '3. Formulario Clientes: Captura de datos del titular con validaciones de expresiones regulares para DNI y teléfono móvil.',
      '4. Formulario Reactivo: Construcción de adopcionForm con FormBuilder.group() y validadores de requerimiento, longitud y correo.',
      '5. Lógica de negocio y estados: Programación del flujo de aprobación/rechazo sincronizado con el catálogo de animales.',
      '6. Dashboard en tiempo real: Cálculo reactivo de indicadores (kpis computed) y barras de progreso por especie.',
      '7. Pruebas y publicación: Aprobación de tests unitarios, compilación limpia y despliegue en Vercel y GitHub.'
    ],
    normas: 'Normas de seguridad y ergonomía: Confidencialidad y protección de datos personales de clientes (DNI y correo), pausas activas preventivas durante la sesión prolongada, mantenimiento preventivo de periféricos de cómputo y respaldo continuo en repositorio Git.',
    diagrama: `+--------------------------------------------------------------------------------+
|                        ARQUITECTURA DEL SISTEMA PETSHOP                        |
+--------------------------------------------------------------------------------+
|                                                                                |
|    [ Formulario 01: Mascotas ]       [ Formulario 02: Clientes ]               |
|      (FormsModule + ngModel)         (Validación Regex DNI/Tel)                |
|                 │                                 │                            |
|                 └───────────────┬─────────────────┘                            |
|                                 ▼                                              |
|             [ PetShopService (Angular Signals State) ]                         |
|             ├── Mascotas Signal <Mascota[]>                                    |
|             ├── Clientes Signal <Cliente[]>                                    |
|             ├── Adopciones Signal <SolicitudAdopcion[]>                        |
|             └── KPIs Computed (Métricas en Tiempo Real)                        |
|                                 │                                              |
|                 ┌───────────────┴─────────────────┐                            |
|                 ▼                                 ▼                            |
|    [ Formulario 03: Adopciones ]       [ Dashboard Ejecutivo (RF05) ]          |
|      (Reactive Forms: FormGroup)         (KPIs, Especies y Embudo)             |
|                                                                                |
|   [ Despliegue Vercel ]  ───> https://pet-shop-eight-sigma.vercel.app/inicio  |
+--------------------------------------------------------------------------------+`
  }
];

// Función para generar el bloque XML de una semana
function buildWeekXml(s) {
  // Construir párrafos de tareas del martes
  const martesP = s.martes.map(t => 
    `<w:p><w:pPr><w:spacing w:line="240" w:lineRule="auto"/><w:rPr><w:sz w:val="18"/><w:lang w:val="es-MX"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="18"/><w:lang w:val="es-MX"/></w:rPr><w:t>${escapeXml(t)}</w:t></w:r></w:p>`
  ).join('');

  // Construir párrafos de tareas del viernes
  const viernesP = s.viernes.map(t => 
    `<w:p><w:pPr><w:spacing w:line="240" w:lineRule="auto"/><w:rPr><w:sz w:val="18"/><w:lang w:val="es-MX"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="18"/><w:lang w:val="es-MX"/></w:rPr><w:t>${escapeXml(t)}</w:t></w:r></w:p>`
  ).join('');

  // Construir párrafos de descripción del proceso
  const pasosP = s.pasos.map(p => 
    `<w:p><w:pPr><w:spacing w:line="240" w:lineRule="auto"/><w:rPr><w:sz w:val="19"/><w:lang w:val="es-MX"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="19"/><w:lang w:val="es-MX"/></w:rPr><w:t>${escapeXml(p)}</w:t></w:r></w:p>`
  ).join('');

  // Construir párrafos del diagrama ASCII
  const diagramaLines = s.diagrama.split('\n');
  const diagramaP = diagramaLines.map(line =>
    `<w:p><w:pPr><w:spacing w:line="200" w:lineRule="auto"/><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas"/><w:sz w:val="15"/><w:lang w:val="es-MX"/></w:rPr></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas"/><w:sz w:val="15"/><w:lang w:val="es-MX"/></w:rPr><w:t xml:space="preserve">${escapeXml(line)}</w:t></w:r></w:p>`
  ).join('');

  return `
  <!-- INICIO SEMANA ${s.num} -->
  <w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="26"/><w:lang w:val="es-MX"/></w:rPr></w:pPr><w:r><w:br w:type="page"/></w:r><w:r><w:rPr><w:b/><w:sz w:val="26"/><w:lang w:val="es-MX"/></w:rPr><w:t>INFORME SEMANAL</w:t></w:r></w:p>
  <w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="1D4ED8"/><w:lang w:val="es-MX"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="1D4ED8"/><w:lang w:val="es-MX"/></w:rPr><w:t>IV SEMESTRE          SEMANA N° ${s.num}          DEL ${s.fechaInicio} AL ${s.fechaFin} DEL 2026</w:t></w:r></w:p>

  <!-- TABLA DE TRABAJOS EFECTUADOS -->
  <w:tbl>
    <w:tblPr>
      <w:tblW w:w="9800" w:type="dxa"/>
      <w:tblBorders>
        <w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/>
        <w:left w:val="single" w:sz="4" w:space="0" w:color="auto"/>
        <w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>
        <w:right w:val="single" w:sz="4" w:space="0" w:color="auto"/>
        <w:insideH w:val="single" w:sz="4" w:space="0" w:color="auto"/>
        <w:insideV w:val="single" w:sz="4" w:space="0" w:color="auto"/>
      </w:tblBorders>
    </w:tblPr>
    <w:tblGrid>
      <w:gridCol w:w="1800"/>
      <w:gridCol w:w="6800"/>
      <w:gridCol w:w="1200"/>
    </w:tblGrid>

    <!-- Fila Cabecera -->
    <w:tr>
      <w:tc><w:tcPr><w:tcW w:w="1800" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="D0CECE"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="20"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="20"/></w:rPr><w:t>DÍA</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="6800" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="D0CECE"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="20"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="20"/></w:rPr><w:t>TRABAJOS EFECTUADOS</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="1200" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="D0CECE"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="20"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="20"/></w:rPr><w:t>HORAS</w:t></w:r></w:p></w:tc>
    </w:tr>

    <!-- Fila Lunes -->
    <w:tr>
      <w:tc><w:tcPr><w:tcW w:w="1800" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="18"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:t>LUNES</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="6800" w:type="dxa"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="18"/><w:color w:val="94A3B8"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="18"/><w:color w:val="94A3B8"/></w:rPr><w:t>Sin actividades programadas</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="1200" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="18"/><w:color w:val="94A3B8"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="18"/><w:color w:val="94A3B8"/></w:rPr><w:t>-</w:t></w:r></w:p></w:tc>
    </w:tr>

    <!-- Fila Martes (Clase 12:45 a 5:30 PM - 5 Horas) -->
    <w:tr>
      <w:tc><w:tcPr><w:tcW w:w="1800" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="18"/><w:color w:val="1E293B"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/><w:color w:val="1E293B"/></w:rPr><w:t>MARTES</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="6800" w:type="dxa"/></w:tcPr>${martesP}</w:tc>
      <w:tc><w:tcPr><w:tcW w:w="1200" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="20"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="20"/></w:rPr><w:t>5</w:t></w:r></w:p></w:tc>
    </w:tr>

    <!-- Fila Miércoles -->
    <w:tr>
      <w:tc><w:tcPr><w:tcW w:w="1800" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="18"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:t>MIÉRCOLES</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="6800" w:type="dxa"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="18"/><w:color w:val="94A3B8"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="18"/><w:color w:val="94A3B8"/></w:rPr><w:t>Sin actividades programadas</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="1200" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="18"/><w:color w:val="94A3B8"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="18"/><w:color w:val="94A3B8"/></w:rPr><w:t>-</w:t></w:r></w:p></w:tc>
    </w:tr>

    <!-- Fila Jueves -->
    <w:tr>
      <w:tc><w:tcPr><w:tcW w:w="1800" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="18"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:t>JUEVES</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="6800" w:type="dxa"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="18"/><w:color w:val="94A3B8"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="18"/><w:color w:val="94A3B8"/></w:rPr><w:t>Sin actividades programadas</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="1200" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="18"/><w:color w:val="94A3B8"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="18"/><w:color w:val="94A3B8"/></w:rPr><w:t>-</w:t></w:r></w:p></w:tc>
    </w:tr>

    <!-- Fila Viernes (Clase 7:00 AM a 1:15 PM - 6 Horas) -->
    <w:tr>
      <w:tc><w:tcPr><w:tcW w:w="1800" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="18"/><w:color w:val="1E293B"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/><w:color w:val="1E293B"/></w:rPr><w:t>VIERNES</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="6800" w:type="dxa"/></w:tcPr>${viernesP}</w:tc>
      <w:tc><w:tcPr><w:tcW w:w="1200" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="20"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="20"/></w:rPr><w:t>6</w:t></w:r></w:p></w:tc>
    </w:tr>

    <!-- Fila Sábado -->
    <w:tr>
      <w:tc><w:tcPr><w:tcW w:w="1800" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="18"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:t>SÁBADO</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="6800" w:type="dxa"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="18"/><w:color w:val="94A3B8"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="18"/><w:color w:val="94A3B8"/></w:rPr><w:t>Sin actividades programadas</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="1200" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="18"/><w:color w:val="94A3B8"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="18"/><w:color w:val="94A3B8"/></w:rPr><w:t>-</w:t></w:r></w:p></w:tc>
    </w:tr>

    <!-- Fila Total -->
    <w:tr>
      <w:tc><w:tcPr><w:tcW w:w="1800" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="20"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="20"/></w:rPr><w:t>TOTAL</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="6800" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="right"/><w:rPr><w:b/><w:sz w:val="20"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="20"/></w:rPr><w:t>HORAS ACUMULADAS EN LA SEMANA:</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="1200" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="E2E8F0"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="1D4ED8"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="1D4ED8"/></w:rPr><w:t>11 Horas</w:t></w:r></w:p></w:tc>
    </w:tr>
  </w:tbl>

  <w:p><w:pPr><w:spacing w:line="200" w:lineRule="auto"/></w:pPr></w:p>

  <!-- Tarea más significativa -->
  <w:p><w:pPr><w:spacing w:before="240" w:after="80"/><w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="0F172A"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="0F172A"/></w:rPr><w:t>Tarea más significativa: </w:t></w:r><w:r><w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="1D4ED8"/></w:rPr><w:t>${escapeXml(s.tareaSignificativa)}</w:t></w:r></w:p>

  <w:p><w:pPr><w:spacing w:before="60" w:after="80"/><w:rPr><w:b/><w:sz w:val="19"/><w:color w:val="475569"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="19"/><w:color w:val="475569"/></w:rPr><w:t>Repositorio GitHub: </w:t></w:r><w:r><w:rPr><w:sz w:val="19"/><w:color w:val="1D4ED8"/></w:rPr><w:t>${escapeXml(s.repositorio)}</w:t></w:r></w:p>
  <w:p><w:pPr><w:spacing w:before="0" w:after="160"/><w:rPr><w:b/><w:sz w:val="19"/><w:color w:val="475569"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="19"/><w:color w:val="475569"/></w:rPr><w:t>Despliegue / Ejecución: </w:t></w:r><w:r><w:rPr><w:sz w:val="19"/><w:color w:val="16A34A"/></w:rPr><w:t>${escapeXml(s.despliegue)}</w:t></w:r></w:p>

  <!-- Descripción del proceso -->
  <w:p><w:pPr><w:spacing w:before="120" w:after="80"/><w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="0F172A"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="0F172A"/></w:rPr><w:t>Descripción del proceso:</w:t></w:r></w:p>
  ${pasosP}

  <w:p><w:pPr><w:spacing w:before="100" w:after="160"/><w:rPr><w:b/><w:sz w:val="19"/><w:color w:val="334155"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="19"/><w:color w:val="334155"/></w:rPr><w:t>Aspectos de Seguridad, Salud Ocupacional y Medio Ambiente: </w:t></w:r><w:r><w:rPr><w:sz w:val="19"/><w:color w:val="475569"/></w:rPr><w:t>${escapeXml(s.normas)}</w:t></w:r></w:p>

  <!-- TABLA HACER ESQUEMA, DIBUJO O DIAGRAMA -->
  <w:tbl>
    <w:tblPr>
      <w:tblW w:w="9800" w:type="dxa"/>
      <w:tblBorders>
        <w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/>
        <w:left w:val="single" w:sz="4" w:space="0" w:color="auto"/>
        <w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>
        <w:right w:val="single" w:sz="4" w:space="0" w:color="auto"/>
        <w:insideH w:val="single" w:sz="4" w:space="0" w:color="auto"/>
        <w:insideV w:val="single" w:sz="4" w:space="0" w:color="auto"/>
      </w:tblBorders>
    </w:tblPr>
    <w:tblGrid><w:gridCol w:w="9800"/></w:tblGrid>
    <w:tr>
      <w:tc><w:tcPr><w:tcW w:w="9800" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="D0CECE"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="20"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="20"/></w:rPr><w:t>HACER ESQUEMA, DIBUJO O DIAGRAMA (SEMANA ${s.num})</w:t></w:r></w:p></w:tc>
    </w:tr>
    <w:tr>
      <w:tc>
        <w:tcPr><w:tcW w:w="9800" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="F8FAFC"/></w:tcPr>
        <w:p><w:pPr><w:spacing w:before="120" w:after="80"/><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="20"/><w:color w:val="1D4ED8"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="20"/><w:color w:val="1D4ED8"/></w:rPr><w:t>DIAGRAMA ESTRUCTURAL Y DE FLUJO DEL PROYECTO</w:t></w:r></w:p>
        ${diagramaP}
        <w:p><w:pPr><w:spacing w:before="160" w:after="60"/><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="19"/><w:color w:val="475569"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="19"/><w:color w:val="475569"/></w:rPr><w:t>[ ESPACIO RESERVADO PARA PEGAR CAPTURA DE PANTALLA DE LA SEMANA ${s.num} ]</w:t></w:r></w:p>
        <w:p><w:pPr><w:spacing w:before="60" w:after="140"/><w:jc w:val="center"/><w:rPr><w:sz w:val="17"/><w:color w:val="94A3B8"/><w:i/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="17"/><w:color w:val="94A3B8"/><w:i/></w:rPr><w:t>Pega aquí la captura tomada desde el navegador web (${escapeXml(s.despliegue)})</w:t></w:r></w:p>
      </w:tc>
    </w:tr>
  </w:tbl>

  <w:p><w:pPr><w:spacing w:line="160" w:lineRule="auto"/></w:pPr></w:p>

  <!-- TABLA AUTOCONTROL DE ASISTENCIA (MARTES Y VIERNES MARCADOS) -->
  <w:tbl>
    <w:tblPr>
      <w:tblW w:w="9800" w:type="dxa"/>
      <w:tblBorders>
        <w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/>
        <w:left w:val="single" w:sz="4" w:space="0" w:color="auto"/>
        <w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>
        <w:right w:val="single" w:sz="4" w:space="0" w:color="auto"/>
        <w:insideH w:val="single" w:sz="4" w:space="0" w:color="auto"/>
        <w:insideV w:val="single" w:sz="4" w:space="0" w:color="auto"/>
      </w:tblBorders>
    </w:tblPr>
    <w:tblGrid>
      <w:gridCol w:w="816"/><w:gridCol w:w="816"/><w:gridCol w:w="816"/><w:gridCol w:w="816"/>
      <w:gridCol w:w="816"/><w:gridCol w:w="816"/><w:gridCol w:w="816"/><w:gridCol w:w="816"/>
      <w:gridCol w:w="816"/><w:gridCol w:w="816"/><w:gridCol w:w="816"/><w:gridCol w:w="824"/>
    </w:tblGrid>

    <!-- Fila 0: Título -->
    <w:tr>
      <w:tc><w:tcPr><w:tcW w:w="9800" w:type="dxa"/><w:gridSpan w:val="12"/><w:shd w:val="clear" w:color="auto" w:fill="D0CECE"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="19"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="19"/></w:rPr><w:t>AUTOCONTROL DE ASISTENCIA POR EL ESTUDIANTE (SEMANA ${s.num})</w:t></w:r></w:p></w:tc>
    </w:tr>

    <!-- Fila 1: Días -->
    <w:tr>
      <w:tc><w:tcPr><w:tcW w:w="1632" w:type="dxa"/><w:gridSpan w:val="2"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="18"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:t>LUNES</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="1632" w:type="dxa"/><w:gridSpan w:val="2"/><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="18"/><w:color w:val="1E293B"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/><w:color w:val="1E293B"/></w:rPr><w:t>MARTES</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="1632" w:type="dxa"/><w:gridSpan w:val="2"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="18"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:t>MIÉRCOLES</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="1632" w:type="dxa"/><w:gridSpan w:val="2"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="18"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:t>JUEVES</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="1632" w:type="dxa"/><w:gridSpan w:val="2"/><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="18"/><w:color w:val="1E293B"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/><w:color w:val="1E293B"/></w:rPr><w:t>VIERNES</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="1640" w:type="dxa"/><w:gridSpan w:val="2"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="18"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/></w:rPr><w:t>SÁBADO</w:t></w:r></w:p></w:tc>
    </w:tr>

    <!-- Fila 2: M / T -->
    <w:tr>
      <w:tc><w:tcPr><w:tcW w:w="816" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="17"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="17"/></w:rPr><w:t>M</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="816" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="17"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="17"/></w:rPr><w:t>T</w:t></w:r></w:p></w:tc>

      <!-- Martes M / T (Tarde marcada) -->
      <w:tc><w:tcPr><w:tcW w:w="816" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="17"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="17"/></w:rPr><w:t>M</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="816" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="DCFCE7"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="17"/><w:color w:val="166534"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="17"/><w:color w:val="166534"/></w:rPr><w:t>T</w:t></w:r></w:p></w:tc>

      <w:tc><w:tcPr><w:tcW w:w="816" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="17"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="17"/></w:rPr><w:t>M</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="816" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="17"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="17"/></w:rPr><w:t>T</w:t></w:r></w:p></w:tc>

      <w:tc><w:tcPr><w:tcW w:w="816" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="17"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="17"/></w:rPr><w:t>M</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="816" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="17"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="17"/></w:rPr><w:t>T</w:t></w:r></w:p></w:tc>

      <!-- Viernes M / T (Ambos marcados) -->
      <w:tc><w:tcPr><w:tcW w:w="816" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="DCFCE7"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="17"/><w:color w:val="166534"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="17"/><w:color w:val="166534"/></w:rPr><w:t>M</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="816" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="DCFCE7"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="17"/><w:color w:val="166534"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="17"/><w:color w:val="166534"/></w:rPr><w:t>T</w:t></w:r></w:p></w:tc>

      <w:tc><w:tcPr><w:tcW w:w="816" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="17"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="17"/></w:rPr><w:t>M</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="824" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="17"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="17"/></w:rPr><w:t>T</w:t></w:r></w:p></w:tc>
    </w:tr>

    <!-- Fila 3: Registro de Asistencia -->
    <w:tr>
      <w:tc><w:tcPr><w:tcW w:w="816" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="16"/><w:color w:val="94A3B8"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="16"/><w:color w:val="94A3B8"/></w:rPr><w:t>-</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="816" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="16"/><w:color w:val="94A3B8"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="16"/><w:color w:val="94A3B8"/></w:rPr><w:t>-</w:t></w:r></w:p></w:tc>

      <!-- Martes -->
      <w:tc><w:tcPr><w:tcW w:w="816" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="16"/><w:color w:val="94A3B8"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="16"/><w:color w:val="94A3B8"/></w:rPr><w:t>-</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="816" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="DCFCE7"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="20"/><w:color w:val="166534"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="20"/><w:color w:val="166534"/></w:rPr><w:t>X</w:t></w:r></w:p></w:tc>

      <w:tc><w:tcPr><w:tcW w:w="816" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="16"/><w:color w:val="94A3B8"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="16"/><w:color w:val="94A3B8"/></w:rPr><w:t>-</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="816" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="16"/><w:color w:val="94A3B8"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="16"/><w:color w:val="94A3B8"/></w:rPr><w:t>-</w:t></w:r></w:p></w:tc>

      <w:tc><w:tcPr><w:tcW w:w="816" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="16"/><w:color w:val="94A3B8"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="16"/><w:color w:val="94A3B8"/></w:rPr><w:t>-</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="816" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="16"/><w:color w:val="94A3B8"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="16"/><w:color w:val="94A3B8"/></w:rPr><w:t>-</w:t></w:r></w:p></w:tc>

      <!-- Viernes -->
      <w:tc><w:tcPr><w:tcW w:w="816" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="DCFCE7"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="20"/><w:color w:val="166534"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="20"/><w:color w:val="166534"/></w:rPr><w:t>X</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="816" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="DCFCE7"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="20"/><w:color w:val="166534"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="20"/><w:color w:val="166534"/></w:rPr><w:t>X</w:t></w:r></w:p></w:tc>

      <w:tc><w:tcPr><w:tcW w:w="816" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="16"/><w:color w:val="94A3B8"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="16"/><w:color w:val="94A3B8"/></w:rPr><w:t>-</w:t></w:r></w:p></w:tc>
      <w:tc><w:tcPr><w:tcW w:w="824" w:type="dxa"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:sz w:val="16"/><w:color w:val="94A3B8"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="16"/><w:color w:val="94A3B8"/></w:rPr><w:t>-</w:t></w:r></w:p></w:tc>
    </w:tr>

    <!-- Fila Leyenda Asistencia -->
    <w:tr>
      <w:tc><w:tcPr><w:tcW w:w="9800" w:type="dxa"/><w:gridSpan w:val="12"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:spacing w:before="60" w:after="60"/><w:jc w:val="center"/><w:rPr><w:sz w:val="16"/><w:color w:val="475569"/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="16"/><w:color w:val="475569"/></w:rPr><w:t>ASISTENCIA REGISTRADA: Martes Tarde (12:45 PM - 5:30 PM) | Viernes Mañana y Tarde (7:00 AM - 1:15 PM) | Total: 11 Horas</w:t></w:r></w:p></w:tc>
    </w:tr>
  </w:tbl>

  <w:p><w:pPr><w:spacing w:line="160" w:lineRule="auto"/></w:pPr></w:p>

  <!-- TABLA EVALUACIÓN Y OBSERVACIONES DEL INSTRUCTOR -->
  <w:tbl>
    <w:tblPr>
      <w:tblW w:w="9800" w:type="dxa"/>
      <w:tblBorders>
        <w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/>
        <w:left w:val="single" w:sz="4" w:space="0" w:color="auto"/>
        <w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>
        <w:right w:val="single" w:sz="4" w:space="0" w:color="auto"/>
        <w:insideH w:val="single" w:sz="4" w:space="0" w:color="auto"/>
        <w:insideV w:val="single" w:sz="4" w:space="0" w:color="auto"/>
      </w:tblBorders>
    </w:tblPr>
    <w:tblGrid><w:gridCol w:w="9800"/></w:tblGrid>
    <w:tr>
      <w:tc><w:tcPr><w:tcW w:w="9800" w:type="dxa"/><w:shd w:val="clear" w:color="auto" w:fill="D0CECE"/><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:sz w:val="20"/></w:rPr></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="20"/></w:rPr><w:t>EVALUACIÓN DEL INFORME DE TRABAJO SEMANAL (SEMANA ${s.num})</w:t></w:r></w:p></w:tc>
    </w:tr>
    <w:tr>
      <w:tc><w:tcPr><w:tcW w:w="9800" w:type="dxa"/></w:tcPr><w:p><w:pPr><w:spacing w:before="120" w:after="120"/><w:jc w:val="both"/><w:rPr><w:sz w:val="18"/><w:color w:val="475569"/><w:i/></w:rPr></w:pPr><w:r><w:rPr><w:sz w:val="18"/><w:color w:val="475569"/><w:i/></w:rPr><w:t>NOTA: El Instructor que revisa los informes de Prácticas realizará la retroalimentación y calificación directamente en la plataforma LMS Blackboard de SENATI.</w:t></w:r></w:p></w:tc>
    </w:tr>
  </w:tbl>
  <!-- FIN SEMANA ${s.num} -->
  `;
}

function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Generar las 4 semanas
const allWeeksXml = SEMANAS_DATA.map(buildWeekXml).join('\n');

// Reemplazar la sección semanal única por las 4 semanas
// weeklyStart es 693414 y tbl7End es 1522047
const beforeWeekly = docXml.substring(0, 693414);
const afterWeekly = docXml.substring(1522047);

const finalXml = beforeWeekly + allWeeksXml + afterWeekly;

// Escribir el nuevo document.xml en el zip
zip.updateFile('word/document.xml', Buffer.from(finalXml, 'utf8'));

// Guardar en las rutas
const outPetShop = 'C:\\Users\\likin\\pet-shop\\PAWD-406_INFORMEDEPRÁCTICA_4_SEMANAS.docx';
const outDownloads1 = 'C:\\Users\\likin\\Downloads\\PAWD-406_INFORMEDEPRÁCTICA_LLENADO_4_SEMANAS.docx';
const outDownloadsOrig = 'C:\\Users\\likin\\Downloads\\PAWD-406_INFORMEDEPRÁCTICA (1).docx';

zip.writeZip(outPetShop);
console.log('Generado exitosamente en:', outPetShop);

zip.writeZip(outDownloads1);
console.log('Generado exitosamente en:', outDownloads1);

try {
  zip.writeZip(outDownloadsOrig);
  console.log('Sobrescrito exitosamente en:', outDownloadsOrig);
} catch (e) {
  console.warn('No se pudo sobrescribir directamente la plantilla original en Downloads (posiblemente abierta en Word):', e.message);
}
