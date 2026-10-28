# Instruya — UX/UI y arquitectura de información

Este directorio contiene las referencias visuales y decisiones de UX/UI definidas para el rediseño de Instruya.

El objetivo del rediseño no es únicamente modificar la apariencia de la aplicación existente, sino reorganizar la arquitectura de información, navegación y experiencia de uso para los distintos roles del sistema.

## Principios generales

### Cada elemento tiene un contexto principal

Cada elemento del sistema debe tener un lugar principal donde se consulta y administra en detalle.

Por ejemplo:

- Un trabajo práctico pertenece a una cursada.
- Una clase pertenece a una cursada.
- Las evaluaciones parciales pertenecen a una cursada.
- Las notas académicas definitivas forman parte de la trayectoria del alumno.
- Una solicitud pertenece a la sección de solicitudes correspondiente.

Las vistas globales, como Inicio, Agenda o Correcciones, pueden reunir información proveniente de diferentes cursadas, pero deben permitir navegar hacia el elemento original conservando su contexto.

### Tres contextos académicos

La experiencia del alumno se organiza en tres grandes contextos:

**Cursada:** representa el día a día académico: clases, asistencia, trabajos prácticos, evaluaciones y devoluciones.

**Trayectoria:** representa el recorrido del alumno dentro de la carrera: materias aprobadas, materias en curso, correlatividades, finales y avance general.

**Trámites:** representa operaciones que ocurren en determinados períodos, como inscripciones a cursadas y mesas de examen.

### Materia y cursada son conceptos diferentes

Una **Materia** forma parte del plan de estudios de una Carrera.

Una **Cursada o Comisión** es una instancia concreta de esa materia en un período determinado y puede tener docente, año, período, comisión y cupo.

Ejemplo:

```text
Programación I
├── Comisión A · 2027 · Docente María Gómez
└── Comisión B · 2027 · Docente Juan Pérez
```

Por este motivo, las materias se administran dentro del plan de estudios de una carrera, mientras que las cursadas poseen una sección operativa independiente.

---

# Navegación por rol

## Alumno — Web

### Inicio

Responde principalmente:

> ¿Cómo estoy y qué tengo que hacer?

Incluye:

- Radar Académico global.
- Alertas activas.
- Próximos eventos.
- Novedades recientes.
- Avisos relacionados con períodos de inscripción.

### Cursadas

Permite consultar las cursadas actuales y anteriores.

Cada cursada contiene:

- Resumen / Radar de la cursada.
- Trabajos prácticos.
- Clases y asistencia.
- Calificaciones.
- Información general de la cursada.

### Agenda

Centraliza eventos próximos provenientes de todas las cursadas:

- vencimientos de trabajos prácticos;
- parciales;
- clases;
- mesas de examen;
- otras fechas académicas relevantes.

### Trayectoria

Representa el recorrido académico completo del alumno.

Incluye:

- plan de estudios;
- materias aprobadas;
- materias en curso;
- materias disponibles;
- materias bloqueadas;
- correlatividades;
- finales;
- notas definitivas;
- avance general de la carrera.

Las evaluaciones parciales y trabajos prácticos no se duplican aquí. Su detalle permanece dentro de la cursada.

### Inscripciones

Incluye dos contextos:

- inscripción a cursadas;
- inscripción a mesas de examen.

El sistema debe informar cuando una inscripción no está disponible y explicar el motivo, por ejemplo una correlatividad pendiente.

### Notificaciones

Las notificaciones se acceden principalmente desde la campana del encabezado.

Pueden dirigir directamente al elemento relacionado, por ejemplo:

```text
“Tu TP 2 fue corregido”
→ Cursadas
→ Programación I
→ Trabajo Práctico 2
```

---

# Alumno — Android

La aplicación Android está orientada principalmente al uso cotidiano del alumno.

La navegación inferior utiliza:

- Inicio
- Cursadas
- Agenda
- Avisos
- Más

Dentro de **Más** pueden encontrarse funcionalidades de uso menos frecuente, como:

- Trayectoria
- Inscripciones
- Perfil
- Configuración

La aplicación mobile comparte los datos y backend/API con la aplicación web, pero no replica necesariamente la misma estructura visual.

---

# Docente — Web

## Inicio

Debe responder:

> ¿Qué tengo que hacer hoy?

Puede incluir:

- clases del día;
- accesos directos para tomar asistencia;
- entregas pendientes de corrección;
- alumnos que requieren atención;
- próximas fechas importantes.

## Comisiones

Muestra las cursadas/comisiones asignadas al docente.

Dentro de una comisión pueden existir:

- Resumen / Radar de grupo.
- Alumnos.
- Clases.
- Asistencia.
- Trabajos prácticos.
- Evaluaciones.
- Información.

## Correcciones

Funciona como una bandeja transversal de entregas pendientes de corrección provenientes de diferentes comisiones.

Cada elemento continúa perteneciendo a su cursada correspondiente.

## Mesas de examen

Permite consultar las mesas asignadas al docente, alumnos inscriptos y carga de resultados cuando corresponda.

---

# Docente — Android

La versión mobile docente está limitada a funcionalidades frecuentes y útiles durante la actividad cotidiana.

La navegación principal contempla:

- Hoy
- Comisiones
- Corregir
- Más

Entre sus principales funcionalidades se encuentran:

- consultar comisiones y alumnos;
- tomar asistencia;
- consultar entregas;
- calificar y dejar devoluciones.

Las operaciones administrativas o de gestión compleja permanecen principalmente en Web.

---

# Administrador

La navegación del Administrador separa las tareas operativas de la estructura académica.

## Inicio

Funciona como una bandeja de situaciones que requieren atención, por ejemplo:

- solicitudes pendientes;
- cursadas sin docente;
- mesas pendientes de configuración;
- estado de períodos de inscripción.

## Solicitudes

Incluye:

- solicitudes de autoregistro de alumnos;
- solicitudes de inscripción a cursadas.

El administrador puede aprobar o rechazar estas solicitudes.

## Cursadas

Permite gestionar la oferta académica de un período:

- crear comisiones;
- asignar docentes;
- definir cupos;
- consultar inscriptos.

## Mesas de examen

Permite:

- crear mesas;
- asignar docentes;
- consultar alumnos inscriptos.

## Carreras

Cada carrera contiene su Plan de Estudios.

Dentro del plan se administran:

- materias;
- correlatividades.

Las Materias no se presentan como una sección global independiente.

## Alumnos

Permite consultar y administrar alumnos de la institución, sus carreras, cursadas y trayectoria académica.

## Docentes

Permite consultar y administrar docentes, junto con sus comisiones y mesas asignadas.

## Configuración

Contiene parámetros institucionales y académicos generales.

---

# Superadmin

El Superadmin administra la plataforma Instruya y no la operación académica cotidiana de cada institución.

Sus principales secciones son:

- Inicio.
- Solicitudes de incorporación.
- Instituciones.
- Administradores.

El flujo principal para incorporar una institución es:

```text
Landing de Instruya
→ Solicitud de incorporación
→ Revisión por Superadmin
→ Aprobación
→ Alta de institución
→ Creación/asignación de administrador
```

La creación manual de instituciones puede existir como operación secundaria.

---

# Radar Académico

El Radar Académico busca interpretar información académica y ayudar al usuario a comprender su situación.

No debe inventar recomendaciones ni asumir reglas universales.

Las recomendaciones se generan a partir de reglas y datos configurados en el sistema.

Existen tres escalas conceptuales:

- Radar de cursada: situación de un alumno dentro de una materia.
- Radar global: situación del alumno considerando todas sus cursadas.
- Radar de grupo: información agregada que ayuda al docente a analizar una comisión.

## Asistencia

La asistencia puede configurarse de diferentes maneras:

### No registrada

No se registra asistencia y, por lo tanto, no aparece como indicador académico.

### Informativa

Se registra y se muestra, pero no condiciona la aprobación.

Ejemplo:

> 10 de 25 clases · 40 %

No genera alertas de riesgo académico.

### Obligatoria

Existe un porcentaje mínimo configurado.

Ejemplo:

> 19 de 25 clases · 76 %  
> Mínimo requerido: 75 %

En este caso el Radar puede generar alertas y recomendaciones.

## Evaluaciones

El sistema no debe calcular automáticamente un promedio mezclando evaluaciones que pueden tener distintos pesos.

Las reglas de evaluación pueden variar entre cursadas.

Por ejemplo, una materia podría considerar solamente parciales para la promoción y requerir únicamente la aprobación de los trabajos prácticos.

Los estados como:

- Promocionando
- Regular
- Debe recuperar

solo pueden mostrarse cuando exista una regla académica configurada que permita determinarlos.

---

# Principios visuales

El diseño utiliza un lenguaje visual propio de Instruya.

Web y Android comparten:

- colores;
- tipografía;
- estados semánticos;
- espaciados;
- componentes conceptuales;
- lenguaje visual.

Sin embargo, cada plataforma respeta sus propios patrones de interacción.

Android utiliza patrones nativos cuando corresponde, como:

- navegación inferior;
- gesto/botón de volver;
- bottom sheets;
- snackbars;
- áreas táctiles adecuadas.

Esto no implica utilizar una estética genérica de Material Design.

---

# Referencias visuales

## Sistema de diseño

`design-system/`

Contiene:

- fundamentos;
- componentes;
- Radar Académico;
- patrones responsive.

## Cursada del Alumno

`cursada-alumno/`

Contiene las primeras pantallas utilizadas para validar la dirección visual del rediseño en Web y Android.

Estas referencias constituyen la base visual inicial sobre la que se desarrollarán los siguientes flujos.

## Trabajos prácticos y entregas

El flujo de trabajos prácticos forma parte de una Cursada y permite al alumno consultar la consigna, descargar archivos proporcionados por el docente, realizar una entrega y consultar posteriormente su corrección.

Las referencias visuales del flujo se encuentran en:

`cursada-alumno/trabajos-practicos/`

Los componentes y estados reutilizables incorporados durante su diseño se documentan en:

`design-system/componentes_de_entrega.png`

### Estados de un trabajo práctico

Un trabajo práctico puede presentarse en distintos estados según sus fechas y la situación de la entrega del alumno:

- **Pendiente:** el período de entrega continúa abierto y el alumno todavía no realizó una entrega.
- **Vencido con entrega tardía habilitada:** pasó la fecha límite original, pero todavía existe una ventana habilitada para entregar fuera de término.
- **Cerrado:** ya no se admiten nuevas entregas ni modificaciones.
- **Entregado:** existe una entrega confirmada dentro del plazo correspondiente.
- **Entregado fuera de término:** la última entrega confirmada se realizó después de la fecha límite original y dentro de una ventana tardía habilitada.
- **Corregido:** el docente calificó la entrega y puede haber registrado una nota, resultado y devolución.

### Carga de archivos

Cada trabajo práctico define los formatos permitidos, la cantidad máxima de archivos y el tamaño máximo admitido.

Durante la preparación de una entrega los archivos pueden encontrarse en distintos estados:

- cargando;
- cargado correctamente;
- error de carga;
- existente en una entrega anterior;
- nuevo;
- marcado para eliminar.

Una entrega no puede confirmarse mientras existan archivos cargando o con errores sin resolver.

### Confirmación de una entrega

La carga de archivos no constituye por sí sola una entrega.

La entrega se considera realizada únicamente cuando el alumno confirma explícitamente el envío.

Antes de confirmar, el sistema debe mostrar:

- los archivos que se enviarán;
- el comentario para el docente, cuando exista;
- la condición de puntualidad resultante.

Si la fecha límite original ya pasó pero existe una ventana tardía habilitada, el sistema debe informar claramente que la entrega quedará registrada como fuera de término.

### Edición de una entrega

Una entrega ya confirmada puede modificarse cuando se cumplen ambas condiciones:

1. el período de entrega continúa habilitado;
2. el docente todavía no corrigió la entrega.

Durante una edición el alumno puede:

- agregar nuevos archivos;
- reemplazar archivos existentes;
- quitar archivos;
- modificar el comentario para el docente.

La edición modifica la entrega existente; no crea una entrega independiente.

Los cambios permanecen sin confirmar hasta que el alumno selecciona **Guardar cambios** y confirma nuevamente el envío.

Si el alumno cancela o cierra la edición antes de confirmar, se conserva sin modificaciones el último envío confirmado.

### Puntualidad de una entrega

La condición de puntualidad corresponde siempre al **último envío confirmado**.

Por lo tanto:

- si una entrega se modifica y vuelve a confirmar antes de la fecha límite, continúa registrada en término;
- si una entrega originalmente realizada en término se modifica y vuelve a confirmar después de la fecha límite, dentro de una ventana tardía habilitada, pasa a registrarse fuera de término;
- si una entrega ya estaba fuera de término y vuelve a confirmarse dentro de la misma ventana tardía, continúa registrada fuera de término.

Una vez cerrado el período de entrega, ya no puede modificarse.

Una vez corregida por el docente, tampoco puede modificarse, incluso si el período todavía se encuentra abierto.

### Corrección

Cuando el docente corrige una entrega, el alumno puede consultar:

- la nota, cuando corresponda;
- el resultado académico;
- la devolución del docente;
- los archivos que había entregado;
- la fecha y condición de su último envío confirmado.

El estado **Corregido** representa que el proceso de evaluación de la entrega finalizó. La nota y el resultado académico se consideran datos independientes del estado de la entrega.

### Web y Android

Web y Android comparten las mismas reglas funcionales y estados.

La presentación se adapta a los patrones propios de cada plataforma. Por ejemplo:

- Web utiliza diálogos para confirmaciones y toast para feedback inmediato.
- Android utiliza bottom sheets para confirmaciones y snackbar para feedback inmediato.

No es necesario que cada combinación posible de estado tenga una pantalla independiente en ambas plataformas; las referencias visuales documentan los casos representativos y los componentes reutilizables.