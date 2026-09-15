const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType
} = require('docx');

function createPlaceholderBox(tituloCaptura, descripcion) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.DASHED, size: 2, color: '94A3B8' },
              bottom: { style: BorderStyle.DASHED, size: 2, color: '94A3B8' },
              left: { style: BorderStyle.DASHED, size: 2, color: '94A3B8' },
              right: { style: BorderStyle.DASHED, size: 2, color: '94A3B8' }
            },
            shading: { fill: 'F8FAFC' },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 200, after: 100 },
                children: [
                  new TextRun({
                    text: `[ ESPACIO PARA CAPTURA: ${tituloCaptura.toUpperCase()} ]`,
                    bold: true,
                    color: '1D4ED8',
                    size: 22
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 100, after: 150 },
                children: [
                  new TextRun({
                    text: `Pega aquí la captura de pantalla correspondiente a esta vista (${descripcion}).`,
                    italics: true,
                    color: '64748B',
                    size: 19
                  })
                ]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 500, after: 500 },
                children: [
                  new TextRun({
                    text: `(Presiona Ctrl + V para insertar la imagen aquí)`,
                    color: '94A3B8',
                    size: 18
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
}

const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 }
        }
      },
      children: [
        // Portada / Cabecera
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400, after: 100 },
          children: [
            new TextRun({
              text: 'PETSHOP · SISTEMA DE GESTIÓN Y ADOPCIONES',
              bold: true,
              size: 32,
              color: '0F172A'
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 200 },
          children: [
            new TextRun({
              text: 'Informe Técnico de Desarrollo y Resultados del Proyecto',
              italics: true,
              size: 24,
              color: '475569'
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 500 },
          children: [
            new TextRun({
              text: 'Desarrollador: alonsoSaavedra-03  |  Repositorio: https://github.com/alonsoSaavedra-03/Pet-shop',
              size: 20,
              color: '1D4ED8',
              bold: true
            })
          ]
        }),

        // 1. Lo que se pedía para el proyecto
        new Paragraph({
          text: '1. Requerimientos del Taller (Lo que se pedía)',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 150 }
        }),
        new Paragraph({
          spacing: { after: 150 },
          children: [
            new TextRun({
              text: 'La empresa PetShop requería modernizar su sistema operativo reemplazando los formularios físicos en papel utilizados para registrar mascotas, clientes y solicitudes de adopción. Como objetivos funcionales y técnicos se especificó:',
              size: 22
            })
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 80 },
          children: [
            new TextRun({ text: 'RF01 · Registro de Mascotas: ', bold: true }),
            new TextRun({ text: 'Capturar nombre (mín. 2 car.), especie, raza, edad (>= 0), sexo (radio) y estado mediante Template-Driven Forms (FormsModule y ngModel).' })
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 80 },
          children: [
            new TextRun({ text: 'RF02 · Validaciones en Tiempo Real: ', bold: true }),
            new TextRun({ text: 'Controles visuales de campos obligatorios, formatos y mensajes de error descriptivos.' })
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 80 },
          children: [
            new TextRun({ text: 'RF03 · Registro de Clientes: ', bold: true }),
            new TextRun({ text: 'Captura validada de nombres, apellidos, DNI (8 dígitos), teléfono (9 dígitos), correo electrónico y dirección.' })
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 80 },
          children: [
            new TextRun({ text: 'RF04 · Solicitud de Adopción: ', bold: true }),
            new TextRun({ text: 'Implementación principal con Reactive Forms (ReactiveFormsModule, FormGroup, FormBuilder y Validators).' })
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 200 },
          children: [
            new TextRun({ text: 'RF05 · Dashboard de Indicadores: ', bold: true }),
            new TextRun({ text: 'Vista consolidada en tiempo real de mascotas, clientes registrados, estado del embudo de adopción y gráficos de distribución.' })
          ]
        }),

        // 2. Objetivos del Proyecto
        new Paragraph({
          text: '2. Objetivos del Proyecto',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 150 }
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 80 },
          children: [
            new TextRun({ text: 'Objetivo General: ', bold: true }),
            new TextRun({ text: 'Construir una aplicación web Angular escalable y modular con navegación por rutas, formularios interactivos validados y persistencia centralizada.' })
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 80 },
          children: [
            new TextRun({ text: 'Objetivo Específico 1: ', bold: true }),
            new TextRun({ text: 'Dominar la integración de Formularios Basados en Plantillas (Template-Driven) con enlace bidireccional mediante ngModel.' })
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 80 },
          children: [
            new TextRun({ text: 'Objetivo Específico 2: ', bold: true }),
            new TextRun({ text: 'Implementar Formularios Reactivos (Reactive Forms) empleando FormGroup, FormBuilder y Validators síncronos.' })
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 200 },
          children: [
            new TextRun({ text: 'Objetivo Específico 3: ', bold: true }),
            new TextRun({ text: 'Diseñar una arquitectura limpia con Angular Signals para la reactividad de datos y sincronización inmediata con el Dashboard.' })
          ]
        }),

        // 3. En qué se basó el diseño
        new Paragraph({
          text: '3. Fundamentos y Criterios del Diseño',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 150 }
        }),
        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({
              text: 'El diseño se desarrolló bajo un enfoque profesional, sobrio y funcional, evitando colores neón o sobrecargas visuales:',
              size: 22
            })
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 80 },
          children: [
            new TextRun({ text: 'Paleta Sobria (Plomo, Negro y Gris): ', bold: true }),
            new TextRun({ text: 'Base neutra en gris suave (#F8FAFC) y componentes en negro carbón (#0F172A) y plomo oscuro (#1E293B).' })
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 80 },
          children: [
            new TextRun({ text: 'Color de Resalte al 10%: ', bold: true }),
            new TextRun({ text: 'Uso de un azul cobalto institucional (#1D4ED8) aplicado exclusivamente para botones de acción principal, cifras destacadas y enlaces activos.' })
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 80 },
          children: [
            new TextRun({ text: 'Jerarquía Tipográfica Directa: ', bold: true }),
            new TextRun({ text: 'Eliminación de etiquetas flotantes o subtítulos detrás de los títulos principales, priorizando la legibilidad inmediata.' })
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 200 },
          children: [
            new TextRun({ text: 'Retroalimentación Clara en Formularios: ', bold: true }),
            new TextRun({ text: 'Bordes discretos en rojo (#DC2626) e íconos de alerta cuando un campo requerido no cumple las reglas, activándose solo cuando el usuario interactúa (touched).' })
          ]
        }),

        // 4. Tecnologías y Herramientas Utilizadas
        new Paragraph({
          text: '4. Tecnologías Utilizadas',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 150 }
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  shading: { fill: '1E293B' },
                  children: [new Paragraph({ children: [new TextRun({ text: 'Tecnología', bold: true, color: 'FFFFFF' })] })]
                }),
                new TableCell({
                  shading: { fill: '1E293B' },
                  children: [new Paragraph({ children: [new TextRun({ text: 'Versión / Rol en el Proyecto', bold: true, color: 'FFFFFF' })] })]
                }),
                new TableCell({
                  shading: { fill: '1E293B' },
                  children: [new Paragraph({ children: [new TextRun({ text: 'Aplicación Concreta', bold: true, color: 'FFFFFF' })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Angular', bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ text: 'Framework SPA v18+' })] }),
                new TableCell({ children: [new Paragraph({ text: 'Arquitectura Standalone Components y enrutamiento modular lazy-loaded.' })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'FormsModule', bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ text: '@angular/forms' })] }),
                new TableCell({ children: [new Paragraph({ text: 'Template-driven forms en el registro de mascotas con [(ngModel)].' })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'ReactiveFormsModule', bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ text: '@angular/forms' })] }),
                new TableCell({ children: [new Paragraph({ text: 'Reactive forms con FormGroup, FormBuilder y Validators en Solicitudes de Adopción.' })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Angular Signals', bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ text: '@angular/core' })] }),
                new TableCell({ children: [new Paragraph({ text: 'Gestión reactiva de estado centralizado en PetShopService y cómputo de KPIs.' })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Bootstrap 5.3 & Icons', bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ text: 'CSS Framework & Icons' })] }),
                new TableCell({ children: [new Paragraph({ text: 'Diseño responsivo, grilla fluida y controles de formulario accesibles.' })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Git & GitHub', bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ text: 'Control de versiones' })] }),
                new TableCell({ children: [new Paragraph({ text: 'Repositorio público: https://github.com/alonsoSaavedra-03/Pet-shop' })] })
              ]
            })
          ]
        }),

        // 5. Lo que logramos
        new Paragraph({
          text: '5. Logros y Resultados Obtenidos',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 150 }
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 80 },
          children: [
            new TextRun({ text: 'Digitalización Completa: ', bold: true }),
            new TextRun({ text: 'Reemplazo total de fichas en papel por formularios con verificación inmediata antes del envío.' })
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 80 },
          children: [
            new TextRun({ text: 'Formularios Híbridos Exitosos: ', bold: true }),
            new TextRun({ text: 'Implementación combinada y balanceada de FormsModule (Mascotas) y ReactiveFormsModule (Adopciones).' })
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 80 },
          children: [
            new TextRun({ text: 'Sincronización Dinámica: ', bold: true }),
            new TextRun({ text: 'Al aprobar una adopción, la mascota cambia automáticamente de estado a "Adoptado" y se recalculan las tasas del Dashboard.' })
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 80 },
          children: [
            new TextRun({ text: 'Persistencia Local: ', bold: true }),
            new TextRun({ text: 'Los registros se conservan en LocalStorage para no perder datos al recargar el navegador.' })
          ]
        }),
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 250 },
          children: [
            new TextRun({ text: 'Compilación y Pruebas Unitarias al 100%: ', bold: true }),
            new TextRun({ text: 'Cero errores en compilación de producción y tests unitarios aprobados con vitest.' })
          ]
        }),

        // 6. Espacios para Capturas de Pantalla
        new Paragraph({
          text: '6. Evidencias de la Aplicación (Espacio para Capturas)',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 150 }
        }),
        new Paragraph({
          spacing: { after: 150 },
          children: [
            new TextRun({
              text: 'A continuación se reservan los recuadros para insertar las capturas de pantalla tomadas desde la aplicación web:',
              size: 22
            })
          ]
        }),

        // Captura 1: Inicio
        new Paragraph({
          text: '6.1. Pantalla de Inicio (Landing Page y Accesos Rápidos)',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 }
        }),
        createPlaceholderBox('Pantalla de Inicio (/inicio)', 'Vista principal con banner, servicios y resumen general'),
        new Paragraph({ spacing: { after: 250 } }),

        // Captura 2: Nosotros
        new Paragraph({
          text: '6.2. Sección Nosotros (Misión, Visión y Servicios)',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 }
        }),
        createPlaceholderBox('Sección Nosotros (/nosotros)', 'Página institucional con valores y especialidades'),
        new Paragraph({ spacing: { after: 250 } }),

        // Captura 3: Mascotas
        new Paragraph({
          text: '6.3. Formulario 01 · Registro y Catálogo de Mascotas (Template-Driven)',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 }
        }),
        createPlaceholderBox('Formulario de Mascotas (/mascotas)', 'Formulario con validaciones FormsModule y tabla de mascotas registradas'),
        new Paragraph({ spacing: { after: 250 } }),

        // Captura 4: Clientes
        new Paragraph({
          text: '6.4. Formulario 02 · Registro y Directorio de Clientes',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 }
        }),
        createPlaceholderBox('Formulario de Clientes (/clientes)', 'Formulario de datos del cliente con validación de DNI, teléfono y email'),
        new Paragraph({ spacing: { after: 250 } }),

        // Captura 5: Adopciones
        new Paragraph({
          text: '6.5. Formulario 03 · Solicitud de Adopción (Reactive Forms)',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 }
        }),
        createPlaceholderBox('Solicitud de Adopción (/adopciones)', 'Formulario reactivo con FormGroup y gestión de estados de solicitud'),
        new Paragraph({ spacing: { after: 250 } }),

        // Captura 6: Dashboard
        new Paragraph({
          text: '6.6. Dashboard · Vista Consolidada con Indicadores y Métricas',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 }
        }),
        createPlaceholderBox('Dashboard de Indicadores (/dashboard)', 'Panel de KPIs, gráficos de barras de especies y embudo de adopciones'),
        new Paragraph({ spacing: { after: 300 } }),

        // 7. Conclusión
        new Paragraph({
          text: '7. Conclusiones',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 150 }
        }),
        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({
              text: 'La solución construida cumple satisfactoriamente con todos los requerimientos funcionales (RF01 al RF05) y formativos exigidos. Se demostró la capacidad de organizar una arquitectura moderna en Angular 18+, vincular datos de forma reactiva, implementar validaciones rigurosas tanto basadas en plantillas como reactivas, y presentar los datos de forma consolidada en un panel visual sobrio y profesional.',
              size: 22
            })
          ]
        })
      ]
    }
  ]
});

async function main() {
  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(__dirname, '..', 'INFORME_PROYECTO_PETSHOP.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log('Documento creado exitosamente en:', outputPath);
}

main().catch(console.error);
