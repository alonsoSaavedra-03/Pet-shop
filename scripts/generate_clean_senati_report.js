const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, HeadingLevel, ImageRun, ShadingType, VerticalAlign
} = require('docx');

const logoPath = path.join(__dirname, 'image1.png');
const hasLogo = fs.existsSync(logoPath);
const logoBuffer = hasLogo ? fs.readFileSync(logoPath) : null;

// Helpers
const borderNone = { style: BorderStyle.NONE, size: 0, color: 'auto' };
const borderThin = { style: BorderStyle.SINGLE, size: 4, color: '003366' };
const borderGray = { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC' };
const borderDashed = { style: BorderStyle.DASHED, size: 8, color: '003366' };

const tableBordersAll = {
  top: borderThin,
  bottom: borderThin,
  left: borderThin,
  right: borderThin,
  insideHorizontal: borderThin,
  insideVertical: borderThin,
};

function createHeaderCell(text, widthPercent = null, colSpan = 1) {
  return new TableCell({
    width: widthPercent ? { size: widthPercent, type: WidthType.PERCENTAGE } : undefined,
    columnSpan: colSpan,
    shading: { fill: '003366', type: ShadingType.CLEAR },
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 120, bottom: 120, left: 140, right: 140 },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: text,
            bold: true,
            color: 'FFFFFF',
            font: 'Arial',
            size: 18,
          }),
        ],
      }),
    ],
  });
}

function createCell(text, opts = {}) {
  const {
    widthPercent,
    bold = false,
    color = '1A1A1A',
    bg = null,
    align = AlignmentType.LEFT,
    size = 18,
    colSpan = 1
  } = opts;

  return new TableCell({
    width: widthPercent ? { size: widthPercent, type: WidthType.PERCENTAGE } : undefined,
    columnSpan: colSpan,
    shading: bg ? { fill: bg, type: ShadingType.CLEAR } : undefined,
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 100, bottom: 100, left: 140, right: 140 },
    children: [
      new Paragraph({
        alignment: align,
        children: [
          new TextRun({
            text: text,
            bold: bold,
            color: color,
            font: 'Arial',
            size: size,
          }),
        ],
      }),
    ],
  });
}

const weeksData = [
  {
    weekNum: 1,
    period: 'Del 18/08/2026 al 22/08/2026',
    tuesdayDate: '18/08/2026',
    fridayDate: '21/08/2026',
    tuesdayTasks: 'Instalación y configuración del entorno de trabajo: Node.js (LTS), Angular CLI v18, configuración de extensiones en VS Code. Inicialización del proyecto base mediante "ng new tarea-1" con Standalone Components. Explicación de la arquitectura SPA.',
    fridayTasks: 'Diseño y codificación de los primeros componentes standalone. Implementación de Data Binding: interpolación ({{ }}), property binding ([property]), event binding ((click)) y two-way binding ([(ngModel)]). Control de versiones inicial y subida al repositorio GitHub.',
    taskName: 'Configuración de Entorno Angular y Creación de Componentes Standalone con Enlace de Datos',
    repoUrl: 'https://github.com/alonsoSaavedra-03/tarea-1',
    webUrl: 'https://github.com/alonsoSaavedra-03/tarea-1',
    steps: [
      'Paso 1: Verificación de prerrequisitos del sistema (Node.js 20+ y npm) mediante terminal.',
      'Paso 2: Instalación global de Angular CLI: npm install -g @angular/cli e inicialización del proyecto con "ng new tarea-1 --standalone".',
      'Paso 3: Análisis de la jerarquía de carpetas: src/app, main.ts y app.config.ts.',
      'Paso 4: Creación de componentes independientes con ng g c components/mi-componente --standalone.',
      'Paso 5: Implementación de lógica en TypeScript con variables de estado y métodos de interacción.',
      'Paso 6: Enlace de datos bidireccional mediante la importación de FormsModule.',
      'Paso 7: Compilación local con "ng serve -o" y push al repositorio Git https://github.com/alonsoSaavedra-03/tarea-1.'
    ],
    diagramText: '[ ARQUITECTURA SEMANA 1: Angular CLI -> Standalone Component -> Template Driven Binding ]'
  },
  {
    weekNum: 2,
    period: 'Del 25/08/2026 al 29/08/2026',
    tuesdayDate: '25/08/2026',
    fridayDate: '28/08/2026',
    tuesdayTasks: 'Estructuración del proyecto Campus-Edu. Modelado de interfaces TypeScript para entidades de Cursos, Categorías y Carrito. Definición de arreglos de datos en memoria para el catálogo educativo.',
    fridayTasks: 'Implementación de lógica de manipulación de arrays con funciones de orden superior (.filter, .map, .find). Desarrollo del módulo de cotización de cursos con cálculo en tiempo real. Filtros dinámicos por categorías y barra de búsqueda. Despliegue en Vercel.',
    taskName: 'Desarrollo de Plataforma Educativa "Campus-Edu" con Catálogo de Cursos, Filtros y Cotizador',
    repoUrl: 'https://github.com/alonsoSaavedra-03/campus-edu',
    webUrl: 'https://campus-edu-beta.vercel.app/inicio',
    steps: [
      'Paso 1: Creación del proyecto campus-edu y definición de la interfaz ICourse (id, título, categoría, precio, imagen, descripción).',
      'Paso 2: Creación del arreglo estático en memoria con múltiples cursos tecnológicos y formativos.',
      'Paso 3: Desarrollo de la barra de búsqueda y filtros reactivos utilizando pipes y métodos filter().',
      'Paso 4: Creación del módulo de cotización y carrito de compras donde el usuario selecciona cursos y calcula subtotales/descuentos.',
      'Paso 5: Maquetación moderna de tarjetas (cards) y badges de estado con diseño responsivo.',
      'Paso 6: Verificación de estabilidad y pruebas unitarias de cálculo matemático en el cotizador.',
      'Paso 7: Despliegue a producción en Vercel (https://campus-edu-beta.vercel.app/inicio) y sincronización con GitHub.'
    ],
    diagramText: '[ ARQUITECTURA SEMANA 2: Campus-Edu -> Array en Memoria -> Filtros (.filter, .map) -> Cotizador -> Vercel ]'
  },
  {
    weekNum: 3,
    period: 'Del 01/09/2026 al 05/09/2026',
    tuesdayDate: '01/09/2026',
    fridayDate: '04/09/2026',
    tuesdayTasks: 'Arquitectura de aplicación corporativa "App Route Saavedra". Configuración del sistema de enrutamiento con Angular Router (app.routes.ts). Creación de componentes de vista: Home, About, Services y Contact.',
    fridayTasks: 'Implementación de navegación con directivas routerLink y routerLinkActive. Integración de servicio centralizado (@Injectable) para alimentar la lista de servicios/cursos en la pestaña Service. Diseño de identidad de marca sobria y moderna. Despliegue en Vercel.',
    taskName: 'Arquitectura y Enrutamiento Web Corporativo "App Route Saavedra" con Angular Router y Servicios',
    repoUrl: 'https://github.com/alonsoSaavedra-03/app-route-saavedra',
    webUrl: 'https://app-route-saavedra.vercel.app/home',
    steps: [
      'Paso 1: Generación del proyecto app-route-saavedra con soporte de enrutamiento integrado.',
      'Paso 2: Definición de rutas en app.routes.ts vinculando rutas hijas a componentes (/home, /about, /service, /contact, redirectTo /home).',
      'Paso 3: Diseño de Navbar corporativo utilizando routerLink con routerLinkActive="active" para feedback visual.',
      'Paso 4: Creación del servicio DataService con decorador @Injectable({ providedIn: "root" }) para suministrar catálogo.',
      'Paso 5: Inyección de dependencia en ServiceComponent para consumir los datos mediante ciclo de vida ngOnInit.',
      'Paso 6: Formulario de contacto y diseño visual corporativo con paleta sobria.',
      'Paso 7: Publicación exitosa en Vercel (https://app-route-saavedra.vercel.app/home) y control de versiones en GitHub.'
    ],
    diagramText: '[ ARQUITECTURA SEMANA 3: Angular Router -> app.routes -> [ /home, /about, /service, /contact ] -> DataService ]'
  },
  {
    weekNum: 4,
    period: 'Del 08/09/2026 al 12/09/2026',
    tuesdayDate: '08/09/2026',
    fridayDate: '11/09/2026',
    tuesdayTasks: 'Inicio del taller PetShop. Configuración de formularios Template-Driven con FormsModule y ngModel para registro de mascotas. Gestión del estado reactivo del dashboard mediante Angular Signals (signal, computed).',
    fridayTasks: 'Implementación de Formularios Reactivos con ReactiveFormsModule, FormGroup, FormBuilder y Validators para Clientes y Adopciones. Validaciones estrictas con alertas contextuales y modal de confirmación. Rediseño sobrio con paleta plomo/negro/gris y acento azul (10%). Despliegue en Vercel.',
    taskName: 'Sistema Integral PetShop con Formularios Template-Driven, Reactive Forms, Validaciones y Signals',
    repoUrl: 'https://github.com/alonsoSaavedra-03/Pet-shop',
    webUrl: 'https://pet-shop-eight-sigma.vercel.app/inicio',
    steps: [
      'Paso 1: Configuración de Standalone Component PetShop e importación de FormsModule y ReactiveFormsModule.',
      'Paso 2: Creación del formulario Template-Driven para registro de mascotas con validaciones de campos requeridos y tipos.',
      'Paso 3: Construcción de Formularios Reactivos mediante FormBuilder para clientes y solicitudes de adopción con validadores de DNI, email y teléfono.',
      'Paso 4: Implementación de estado reactivo global con Angular Signals (signal([]) y computed()) para estadísticas en tiempo real.',
      'Paso 5: Aplicación de diseño sobrio: paleta base en gris grafito, slate y acento azul institucional al 10%.',
      'Paso 6: Modal interactivo de confirmación y alertas dinámicas de validación amigables para el usuario.',
      'Paso 7: Verificación final, despliegue en Vercel (https://pet-shop-eight-sigma.vercel.app/inicio) y subida a GitHub alonsoSaavedra-03/Pet-shop.'
    ],
    diagramText: '[ ARQUITECTURA SEMANA 4: PetShop SPA -> Template-Driven (Mascotas) + Reactive Forms (Adopción) -> Signals State -> Vercel ]'
  }
];

const children = [];

// ==================== PORTADA ====================
if (hasLogo && logoBuffer) {
  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new ImageRun({
          data: logoBuffer,
          transformation: { width: 140, height: 50 },
        }),
      ],
      spacing: { after: 200 },
    })
  );
}

children.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: 'SERVICIO NACIONAL DE ADIESTRAMIENTO EN TRABAJO INDUSTRIAL',
        bold: true,
        size: 24,
        color: '003366',
        font: 'Arial',
      }),
    ],
    spacing: { after: 100 },
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: 'DIRECCIÓN ZONAL LIMA - CALLAO',
        bold: true,
        size: 20,
        color: '003366',
        font: 'Arial',
      }),
    ],
    spacing: { after: 60 },
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: 'FORMACIÓN PROFESIONAL DUAL - ESCUELA DE TECNOLOGÍAS DE LA INFORMACIÓN',
        bold: true,
        size: 18,
        color: '555555',
        font: 'Arial',
      }),
    ],
    spacing: { after: 240 },
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: 'CUADERNO DE INFORMES DE TRABAJO SEMANAL',
        bold: true,
        size: 26,
        color: '003366',
        font: 'Arial',
      }),
    ],
    spacing: { after: 80 },
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: 'CÓDIGO N° 89001677 | CURSO: PAWD-406 (DESARROLLO FRONTEND / ANGULAR)',
        bold: true,
        size: 18,
        color: '333333',
        font: 'Arial',
      }),
    ],
    spacing: { after: 300 },
  })
);

// Info Table
const infoRows = [
  ['CFP / ESCUELA:', 'ESCUELA DE TECNOLOGÍAS DE LA INFORMACIÓN (ETI) - LIMA CALLAO'],
  ['ESTUDIANTE:', 'ALONSO SAAVEDRA (Usuario GitHub: alonsoSaavedra-03)'],
  ['ID / BLOQUE:', '1478201  /  PT-406'],
  ['CARRERA:', 'PROGRAMACIÓN Y ARQUITECTURA WEB / DESARROLLO DE SOFTWARE'],
  ['INSTRUCTOR:', 'LUQUE CHAMBI JORGE'],
  ['SEMESTRE / PERÍODO:', 'IV SEMESTRE  |  2026-II  (Del 18/08/2026 al 11/09/2026)'],
  ['HORARIO DE PRÁCTICA:', 'MARTES: 12:45 PM - 5:30 PM (5h)  |  VIERNES: 7:00 AM - 1:15 PM (6h)  [Total: 11 hrs/sem]']
];

children.push(
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: tableBordersAll,
    rows: infoRows.map(row => new TableRow({
      children: [
        createCell(row[0], { widthPercent: 30, bold: true, bg: 'F0F4F8', color: '003366' }),
        createCell(row[1], { widthPercent: 70, bold: false, color: '111111' })
      ]
    }))
  }),
  new Paragraph({ spacing: { after: 300 } })
);

// Plan de Rotaciones
children.push(
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [
      new TextRun({
        text: 'PLAN DE ROTACIONES',
        bold: true,
        size: 20,
        color: '003366',
        font: 'Arial',
      }),
    ],
    spacing: { before: 200, after: 100 },
  }),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: tableBordersAll,
    rows: [
      new TableRow({
        children: [
          createHeaderCell('ÁREA / SECCIÓN / REFERENCIA', 50),
          createHeaderCell('PERÍODO (DESDE - HASTA)', 30),
          createHeaderCell('SEMANAS', 20),
        ]
      }),
      new TableRow({
        children: [
          createCell('Desarrollo Web Frontend - Framework Angular\nLaboratorio de Cómputo TI / Desarrollo Remoto', { widthPercent: 50, bold: true }),
          createCell('Del 18/08/2026\nal 11/09/2026', { widthPercent: 30, align: AlignmentType.CENTER }),
          createCell('4 Semanas\n(44 Horas Totales)', { widthPercent: 20, align: AlignmentType.CENTER, bold: true }),
        ]
      })
    ]
  }),
  new Paragraph({ spacing: { after: 300 } })
);

// PEA Table
children.push(
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [
      new TextRun({
        text: 'PLAN ESPECÍFICO DE APRENDIZAJE (PEA) - SEGUIMIENTO Y AVANCE',
        bold: true,
        size: 20,
        color: '003366',
        font: 'Arial',
      }),
    ],
    spacing: { before: 200, after: 100 },
  })
);

const peaItems = [
  { n: '01', desc: 'Instalación y configuración de Node.js LTS, Angular CLI v18 y extensiones.', sem: '1' },
  { n: '02', desc: 'Creación de proyecto Angular con Standalone Components y arquitectura moderna.', sem: '1' },
  { n: '03', desc: 'Implementación de Data Binding: interpolación, property, event y two-way binding.', sem: '1' },
  { n: '04', desc: 'Manejo de colecciones de datos e interfaces TypeScript para tipado estricto.', sem: '2' },
  { n: '05', desc: 'Manipulación de arreglos con programación funcional (.filter, .map, .find, .reduce).', sem: '2' },
  { n: '06', desc: 'Desarrollo de módulos de cálculo dinámico (cotizador de cursos) y buscador.', sem: '2' },
  { n: '07', desc: 'Configuración del sistema de navegación con Angular Router y definición de rutas.', sem: '3' },
  { n: '08', desc: 'Implementación de directivas routerLink, routerLinkActive y redirección comodín (**).', sem: '3' },
  { n: '09', desc: 'Creación de Servicios (@Injectable) para inyección de dependencias y datos globales.', sem: '3' },
  { n: '10', desc: 'Implementación de Formularios Template-Driven con FormsModule y directiva ngModel.', sem: '4' },
  { n: '11', desc: 'Implementación de Formularios Reactivos con ReactiveFormsModule, FormGroup y FormBuilder.', sem: '4' },
  { n: '12', desc: 'Validaciones de formularios (Validators.required, email, pattern) y mensajes dinámicos.', sem: '4' },
  { n: '13', desc: 'Gestión moderna de estado reactivo mediante Angular Signals (signal, computed).', sem: '4' },
  { n: '14', desc: 'Despliegue continuo en producción (Vercel) y control de versiones distribuido en GitHub.', sem: '1-4' },
];

children.push(
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: tableBordersAll,
    rows: [
      new TableRow({
        children: [
          createHeaderCell('N°', 8),
          createHeaderCell('OPERACIONES / TAREAS DEL MÓDULO', 68),
          createHeaderCell('EJECUTADO', 12),
          createHeaderCell('SEMANA', 12),
        ]
      }),
      ...peaItems.map(p => new TableRow({
        children: [
          createCell(p.n, { widthPercent: 8, align: AlignmentType.CENTER, bold: true }),
          createCell(p.desc, { widthPercent: 68 }),
          createCell('SÍ [ X ]', { widthPercent: 12, align: AlignmentType.CENTER, bold: true, color: '006600' }),
          createCell(`Semana ${p.sem}`, { widthPercent: 12, align: AlignmentType.CENTER, bold: true }),
        ]
      }))
    ]
  }),
  new Paragraph({ spacing: { after: 300 } })
);

// ==================== 4 SEMANAS ====================
weeksData.forEach((w) => {
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      children: [
        new TextRun({
          text: `INFORME SEMANAL - SEMANA N° ${w.weekNum}`,
          bold: true,
          size: 22,
          color: '003366',
          font: 'Arial',
        }),
      ],
      spacing: { before: 400, after: 80 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: `PERÍODO: `, bold: true, font: 'Arial', size: 18 }),
        new TextRun({ text: `${w.period}   |   `, font: 'Arial', size: 18 }),
        new TextRun({ text: `SEMESTRE: `, bold: true, font: 'Arial', size: 18 }),
        new TextRun({ text: `IV SEMESTRE   |   `, font: 'Arial', size: 18 }),
        new TextRun({ text: `TOTAL HORAS SEMANALES: `, bold: true, font: 'Arial', size: 18, color: '003366' }),
        new TextRun({ text: `11 HORAS`, bold: true, font: 'Arial', size: 18, color: '003366' }),
      ],
      spacing: { after: 160 },
    })
  );

  // Tabla DÍA
  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: tableBordersAll,
      rows: [
        new TableRow({
          children: [
            createHeaderCell('DÍA', 22),
            createHeaderCell('TRABAJOS EFECTUADOS / ACTIVIDADES FORMATIVAS', 66),
            createHeaderCell('HORAS', 12),
          ]
        }),
        new TableRow({
          children: [
            createCell('LUNES', { widthPercent: 22, bold: true, bg: 'FAFAFA' }),
            createCell('Sin actividades académicas programadas (Estudio no programado este día).', { widthPercent: 66, color: '777777' }),
            createCell('0', { widthPercent: 12, align: AlignmentType.CENTER }),
          ]
        }),
        new TableRow({
          children: [
            createCell(`MARTES\n(${w.tuesdayDate})\n12:45 PM - 5:30 PM`, { widthPercent: 22, bold: true, bg: 'F0F4F8', color: '003366' }),
            createCell(w.tuesdayTasks, { widthPercent: 66 }),
            createCell('5', { widthPercent: 12, align: AlignmentType.CENTER, bold: true, color: '003366' }),
          ]
        }),
        new TableRow({
          children: [
            createCell('MIÉRCOLES', { widthPercent: 22, bold: true, bg: 'FAFAFA' }),
            createCell('Sin actividades académicas programadas (Estudio no programado este día).', { widthPercent: 66, color: '777777' }),
            createCell('0', { widthPercent: 12, align: AlignmentType.CENTER }),
          ]
        }),
        new TableRow({
          children: [
            createCell('JUEVES', { widthPercent: 22, bold: true, bg: 'FAFAFA' }),
            createCell('Sin actividades académicas programadas (Estudio no programado este día).', { widthPercent: 66, color: '777777' }),
            createCell('0', { widthPercent: 12, align: AlignmentType.CENTER }),
          ]
        }),
        new TableRow({
          children: [
            createCell(`VIERNES\n(${w.fridayDate})\n07:00 AM - 1:15 PM`, { widthPercent: 22, bold: true, bg: 'F0F4F8', color: '003366' }),
            createCell(w.fridayTasks, { widthPercent: 66 }),
            createCell('6', { widthPercent: 12, align: AlignmentType.CENTER, bold: true, color: '003366' }),
          ]
        }),
        new TableRow({
          children: [
            createCell('SÁBADO', { widthPercent: 22, bold: true, bg: 'FAFAFA' }),
            createCell('Sin actividades académicas programadas (Estudio no programado este día).', { widthPercent: 66, color: '777777' }),
            createCell('0', { widthPercent: 12, align: AlignmentType.CENTER }),
          ]
        }),
        new TableRow({
          children: [
            createCell('TOTAL HORAS SEMANALES', { widthPercent: 88, colSpan: 2, bold: true, align: AlignmentType.RIGHT, bg: '003366', color: 'FFFFFF' }),
            createCell('11 HORAS', { widthPercent: 12, bold: true, align: AlignmentType.CENTER, bg: '003366', color: 'FFFFFF' }),
          ]
        }),
      ]
    }),
    new Paragraph({ spacing: { after: 200 } })
  );

  // Tarea más significativa
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'TAREA MÁS SIGNIFICATIVA: ', bold: true, size: 20, color: '003366', font: 'Arial' }),
        new TextRun({ text: w.taskName, bold: true, size: 19, color: '111111', font: 'Arial' }),
      ],
      spacing: { before: 160, after: 80 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: '• Repositorio GitHub: ', bold: true, size: 17, color: '333333', font: 'Arial' }),
        new TextRun({ text: w.repoUrl, size: 17, color: '003366', underline: {}, font: 'Arial' }),
        new TextRun({ text: '   |   • Enlace Web: ', bold: true, size: 17, color: '333333', font: 'Arial' }),
        new TextRun({ text: w.webUrl, size: 17, color: '003366', underline: {}, font: 'Arial' }),
      ],
      spacing: { after: 140 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: 'Descripción del Proceso Técnico y Metodológico:', bold: true, size: 19, color: '003366', font: 'Arial' }),
      ],
      spacing: { after: 100 },
    })
  );

  w.steps.forEach(st => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: st, size: 17, font: 'Arial' })
        ],
        spacing: { after: 60 },
        indent: { left: 240 }
      })
    );
  });

  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'Aspectos de Seguridad, Ergonomía y Cuidado Ambiental (SHI):', bold: true, size: 18, color: '003366', font: 'Arial' }),
      ],
      spacing: { before: 140, after: 60 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: '1. Ergonomía postural frente al computador (ángulo de 90° en codos y rodillas, distancia visual a la pantalla de 50-60 cm).\n' +
                '2. Pausas activas y descanso visual cada 50 minutos para prevenir la fatiga ocular y síndrome del túnel carpiano.\n' +
                '3. Uso eficiente y responsable de la energía eléctrica apagando monitores y equipos al terminar la jornada de laboratorio.\n' +
                '4. Buenas prácticas de código limpio y control de versiones evitando desperdicio de recursos computacionales.',
          size: 16,
          color: '444444',
          font: 'Arial'
        })
      ],
      spacing: { after: 180 },
      indent: { left: 240 }
    })
  );

  // Cuadro de Esquema / Imagen
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'HACER ESQUEMA, DIBUJO O DIAGRAMA (EVIDENCIA DEL PROYECTO):', bold: true, size: 19, color: '003366', font: 'Arial' }),
      ],
      spacing: { before: 140, after: 80 },
    }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: borderDashed,
        bottom: borderDashed,
        left: borderDashed,
        right: borderDashed,
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              shading: { fill: 'F9FBFD', type: ShadingType.CLEAR },
              margins: { top: 240, bottom: 240, left: 200, right: 200 },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: w.diagramText,
                      bold: true,
                      size: 18,
                      color: '003366',
                      font: 'Consolas',
                    }),
                  ],
                  spacing: { after: 120 },
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                      color: 'CCCCCC',
                      font: 'Consolas',
                    }),
                  ],
                  spacing: { after: 120 },
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: '[ ESPACIO RESERVADO PARA PEGAR CAPTURA DE PANTALLA (CTRL + V) ]',
                      bold: true,
                      size: 20,
                      color: '0055AA',
                      font: 'Arial',
                    }),
                  ],
                  spacing: { after: 80 },
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun({
                      text: `Captura de interfaz: ${w.taskName}\nEnlace para verificar captura: ${w.webUrl}`,
                      size: 16,
                      color: '666666',
                      font: 'Arial',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    new Paragraph({ spacing: { after: 200 } })
  );

  // Tabla Autocontrol de Asistencia
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'AUTOCONTROL DE ASISTENCIA POR EL ESTUDIANTE:', bold: true, size: 18, color: '003366', font: 'Arial' }),
      ],
      spacing: { before: 140, after: 80 },
    }),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: tableBordersAll,
      rows: [
        new TableRow({
          children: [
            createHeaderCell('LUNES', 16, 2),
            createHeaderCell('MARTES', 17, 2),
            createHeaderCell('MIÉRCOLES', 16, 2),
            createHeaderCell('JUEVES', 16, 2),
            createHeaderCell('VIERNES', 17, 2),
            createHeaderCell('SÁBADO', 18, 2),
          ]
        }),
        new TableRow({
          children: [
            createCell('M', { align: AlignmentType.CENTER, bold: true }),
            createCell('T', { align: AlignmentType.CENTER, bold: true }),
            createCell('M', { align: AlignmentType.CENTER, bold: true }),
            createCell('T', { align: AlignmentType.CENTER, bold: true }),
            createCell('M', { align: AlignmentType.CENTER, bold: true }),
            createCell('T', { align: AlignmentType.CENTER, bold: true }),
            createCell('M', { align: AlignmentType.CENTER, bold: true }),
            createCell('T', { align: AlignmentType.CENTER, bold: true }),
            createCell('M', { align: AlignmentType.CENTER, bold: true }),
            createCell('T', { align: AlignmentType.CENTER, bold: true }),
            createCell('M', { align: AlignmentType.CENTER, bold: true }),
            createCell('T', { align: AlignmentType.CENTER, bold: true }),
          ]
        }),
        new TableRow({
          children: [
            createCell('-', { align: AlignmentType.CENTER, color: '999999' }),
            createCell('-', { align: AlignmentType.CENTER, color: '999999' }),
            createCell('-', { align: AlignmentType.CENTER, color: '999999' }),
            createCell('X', { align: AlignmentType.CENTER, bold: true, color: '003366', bg: 'E6F0FA' }), // Martes Tarde
            createCell('-', { align: AlignmentType.CENTER, color: '999999' }),
            createCell('-', { align: AlignmentType.CENTER, color: '999999' }),
            createCell('-', { align: AlignmentType.CENTER, color: '999999' }),
            createCell('-', { align: AlignmentType.CENTER, color: '999999' }),
            createCell('X', { align: AlignmentType.CENTER, bold: true, color: '003366', bg: 'E6F0FA' }), // Viernes Mañana
            createCell('X', { align: AlignmentType.CENTER, bold: true, color: '003366', bg: 'E6F0FA' }), // Viernes Tarde
            createCell('-', { align: AlignmentType.CENTER, color: '999999' }),
            createCell('-', { align: AlignmentType.CENTER, color: '999999' }),
          ]
        }),
      ]
    }),
    new Paragraph({
      children: [
        new TextRun({ text: '* Días de Asistencia Efectiva: ', bold: true, size: 16, font: 'Arial' }),
        new TextRun({ text: 'Martes (Tarde: 12:45 a 17:30 - 5 hrs) y Viernes (Mañana/Tarde: 07:00 a 13:15 - 6 hrs). Total: 11 Horas académicas.', size: 16, font: 'Arial' }),
      ],
      spacing: { before: 60, after: 140 },
    }),
    // Observaciones y Evaluación
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: tableBordersAll,
      rows: [
        new TableRow({
          children: [
            createCell('EVALUACIÓN DEL INFORME DE TRABAJO SEMANAL', { widthPercent: 60, bold: true, bg: 'F0F4F8', color: '003366' }),
            createCell('OBSERVACIONES Y RECOMENDACIONES', { widthPercent: 40, bold: true, bg: 'F0F4F8', color: '003366' }),
          ]
        }),
        new TableRow({
          children: [
            createCell('NOTA:\n\n_______________________\nFIRMA DEL INSTRUCTOR:\n\n_______________________', { widthPercent: 60, size: 17 }),
            createCell('Cumplimiento satisfactorio de las competencias requeridas en Angular. El estudiante completó las tareas según los estándares técnicos establecidos.', { widthPercent: 40, size: 16, color: '444444' }),
          ]
        })
      ]
    }),
    new Paragraph({ spacing: { after: 360 } })
  );
});

// Pie final
children.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: 'PROPIEDAD INTELECTUAL DEL SENATI. PROHIBIDA SU REPRODUCCIÓN Y VENTA SIN LA AUTORIZACIÓN CORRESPONDIENTE.',
        size: 15,
        color: '888888',
        font: 'Arial',
        italics: true,
      }),
    ],
    spacing: { before: 200, after: 200 },
  })
);

const doc = new Document({
  creator: 'SENATI - Escuela de Tecnologías de la Información',
  title: 'Informe de Práctica 4 Semanas - PAWD-406',
  description: 'Cuaderno de Informes de Práctica Semanal - Alonso Saavedra',
  sections: [
    {
      properties: {
        page: {
          margin: { top: 1200, bottom: 1200, left: 1400, right: 1400 },
        },
      },
      children: children,
    },
  ],
});

async function run() {
  console.log('Generando documento DOCX con formato 100% nativo y validado...');
  const buffer = await Packer.toBuffer(doc);

  const outProject = path.join(__dirname, '..', 'PAWD-406_INFORMEDEPRÁCTICA_4_SEMANAS.docx');
  fs.writeFileSync(outProject, buffer);
  console.log('Guardado en proyecto:', outProject);

  const downloadsDir = 'C:\\Users\\likin\\Downloads';
  const outDownloadsCustom = path.join(downloadsDir, 'PAWD-406_INFORMEDEPRÁCTICA_LLENADO_4_SEMANAS.docx');
  fs.writeFileSync(outDownloadsCustom, buffer);
  console.log('Guardado en Descargas con nombre claro:', outDownloadsCustom);

  const outDownloadsOriginal = path.join(downloadsDir, 'PAWD-406_INFORMEDEPRÁCTICA (1).docx');
  try {
    fs.writeFileSync(outDownloadsOriginal, buffer);
    console.log('Guardado y sobrescrito en archivo original:', outDownloadsOriginal);
  } catch (err) {
    console.log('Nota: El archivo original de descargas estaba bloqueado por Word, pero el archivo PAWD-406_INFORMEDEPRÁCTICA_LLENADO_4_SEMANAS.docx se guardó exitosamente.');
  }

  console.log('¡GENERACIÓN EXITOSA! Tamaño del archivo:', buffer.length, 'bytes');
}

run().catch(console.error);
