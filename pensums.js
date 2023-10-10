const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

//Materias inscritas
var materiasInscritas = [];
var inscripciones = [];

// Datos de ejemplo para los pensums
const tecnicoEnComputacion = [
    {
      codigo: "ANF231",
      nombre: "Antropología Filosófica",
      unidadesValorativas: 3,
      prerrequisito: "Bachillerato"
    },
    {
      codigo: "LME404",
      nombre: "Lenguajes de Marcado y Estilo Web",
      unidadesValorativas: 4,
      prerrequisito: "Bachillerato"
    },
    {
      codigo: "MAD541",
      nombre: "Matemática Discreta",
      unidadesValorativas: 4,
      prerrequisito: "Bachillerato"
    },
    {
      codigo: "PAL404",
      nombre: "Programación de Algoritmos",
      unidadesValorativas: 4,
      prerrequisito: "Bachillerato"
    },
    {
      codigo: "REC404",
      nombre: "Redes de Comunicación",
      unidadesValorativas: 4,
      prerrequisito: "Bachillerato"
    },
    {
      codigo: "ADS404",
      nombre: "Análisis y Diseño de Sistemas",
      unidadesValorativas: 3,
      prerrequisito: "PAL404"
    },
    {
      codigo: "DAW404",
      nombre: "Desarrollo de Aplic. Web con Soft. Interpret. en el Cliente",
      unidadesValorativas: 4,
      prerrequisito: "LME404"
    },
    {
      codigo: "DSP404",
      nombre: "Desarrollo de Aplicaciones con Software Propietario",
      unidadesValorativas: 4,
      prerrequisito: "PAL404"
    },
    {
      codigo: "EOE202",
      nombre: "Expresión Oral y Escrita",
      unidadesValorativas: 3,
      prerrequisito: "Bachillerato"
    },
    {
      codigo: "MTE511",
      nombre: "Matemática Técnica",
      unidadesValorativas: 4,
      prerrequisito: "MAD541"
    }
];

const ingenieriaEnComputacion = [
    {
      codigo: "CAD501",
      nombre: "Cálculo Diferencial",
      unidadesValorativas: 4,
      prerrequisito: "Bachillerato"
    },
    {
      codigo: "PRE104",
      nombre: "Programación Estructurada",
      unidadesValorativas: 4,
      prerrequisito: "Bachillerato"
    },
    {
      codigo: "QUG501",
      nombre: "Química General",
      unidadesValorativas: 4,
      prerrequisito: "Bachillerato"
    },
    {
      codigo: "AVM501",
      nombre: "Álgebra Vectorial y Matrices",
      unidadesValorativas: 3,
      prerrequisito: "Bachillerato"
    },
    {
      codigo: "CAI501",
      nombre: "Cálculo Integral",
      unidadesValorativas: 4,
      prerrequisito: "CAD501"
    },
    {
      codigo: "CDP501",
      nombre: "Cinemática y Dinámica de Partículas",
      unidadesValorativas: 4,
      prerrequisito: "CAD501"
    },
    {
      codigo: "MDB104",
      nombre: "Modelamiento y Diseño de Base de Datos",
      unidadesValorativas: 4,
      prerrequisito: "PRE104"
    },
    {
      codigo: "POO104",
      nombre: "Programación Orientada a Objetos",
      unidadesValorativas: 4,
      prerrequisito: "PRE104"
    },
    {
      codigo: "ADS104",
      nombre: "Análisis y Diseño de Sistemas Informáticos",
      unidadesValorativas: 4,
      prerrequisito: "MDB104, POO104"
    },
    {
      codigo: "COE201",
      nombre: "Comunicación Oral y Escrita",
      unidadesValorativas: 3,
      prerrequisito: "Bachillerato"
    }
];

// Declaración de variables globales para técnico en computación
let materiasEncontradas = [];
let materiasCiclo1 = [];
let materiasCiclo2 = [];
let codigosCiclo1 = [];
let codigosCiclo2 = [];

// Llena las variables globales con los datos adecuados para técnico en computación
tecnicoEnComputacion.forEach(curso => {
  if (curso.prerrequisito === 'Bachillerato') {
    materiasCiclo1.push(curso);
    codigosCiclo1.push(curso.codigo);
  } else if (codigosCiclo1.includes(curso.prerrequisito)) {
    materiasCiclo2.push(curso);
    codigosCiclo2.push(curso.codigo);
  }
});

// Declaración de variables globales para ingeniería en computación
let ingenieriaEnComputacionMateriasEncontradas = [];
let ingenieriaEnComputacionMateriasCiclo1 = [];
let ingenieriaEnComputacionMateriasCiclo2 = [];
let ingenieriaEnComputacionMateriasCiclo3 = [];
let ingenieriaEnComputacionCodigosCiclo1 = [];
let ingenieriaEnComputacionCodigosCiclo2 = [];
let ingenieriaEnComputacionCodigosCiclo3 = [];

// Llena las variables globales con los datos adecuados para ingeniería en computación
ingenieriaEnComputacion.forEach(curso => {
  if (curso.prerrequisito === 'Bachillerato') {
    ingenieriaEnComputacionMateriasCiclo1.push(curso);
    ingenieriaEnComputacionCodigosCiclo1.push(curso.codigo);
  } else if (ingenieriaEnComputacionCodigosCiclo1.includes(curso.prerrequisito)) {
    ingenieriaEnComputacionMateriasCiclo2.push(curso);
    ingenieriaEnComputacionCodigosCiclo2.push(curso.codigo);
  } else if (curso.codigo === 'ADS104') { // Agregamos una condición para la materia "ADS104"
    ingenieriaEnComputacionMateriasCiclo3.push(curso);
    ingenieriaEnComputacionCodigosCiclo3.push(curso.codigo);
  }
});

// Ruta para consulta de prerrequisitos de una materia por código
app.get('/api/prerrequisitos/:codigo', (req, res) => {
    const codigo = req.params.codigo;
  
    // Busca el curso en ambos pensums
    const cursoTecnico = tecnicoEnComputacion.find(curso => curso.codigo === codigo);
    const cursoIngenieria = ingenieriaEnComputacion.find(curso => curso.codigo === codigo);
  
    if (cursoTecnico) {
      res.json({ prerrequisito: cursoTecnico.prerrequisito });
    } else if (cursoIngenieria) {
      res.json({ prerrequisito: cursoIngenieria.prerrequisito });
    } else {
      res.status(404).json({ mensaje: `Curso con código ${codigo} no encontrado.` });
    }
});

// Ruta para consulta de materias por ciclo de técnico en computación
app.get('/api/materias-tecnico/:ciclo', (req, res) => {
    const ciclo = req.params.ciclo;
    
    if (ciclo === '1') {
      materiasEncontradas = materiasCiclo1;
    } else if (ciclo === '2') {
      materiasEncontradas = materiasCiclo2;
    } else {
      res.status(404).json({ mensaje: `Ciclo ${ciclo} no válido. La carrera no posee ciclo ${ciclo}` });
      return;
    }
  
    if (materiasEncontradas.length > 0) {
      res.json({ materias: materiasEncontradas });
    } else {
      res.status(404).json({ mensaje: `No se encontraron materias para el ciclo ${ciclo} en Técnico en computación.` });
    }
});

app.get('/api/materias-ingenieria/:ciclo', (req, res) => {
    const ciclo = req.params.ciclo;
    
    if (ciclo === '1') {
      ingenieriaEnComputacionMateriasEncontradas = ingenieriaEnComputacionMateriasCiclo1;
    } else if (ciclo === '2') {
      ingenieriaEnComputacionMateriasEncontradas = ingenieriaEnComputacionMateriasCiclo2;
    } else if (ciclo === '3') {
      ingenieriaEnComputacionMateriasEncontradas = ingenieriaEnComputacionMateriasCiclo3;
    } else {
      res.status(404).json({ mensaje: `Ciclo ${ciclo} no válido. La carrera no posee ciclo ${ciclo}` });
      return;
    }
  
    if (ingenieriaEnComputacionMateriasEncontradas.length > 0) {
      res.json({ materias: ingenieriaEnComputacionMateriasEncontradas });
    } else {
      res.status(404).json({ mensaje: `No se encontraron materias para el ciclo ${ciclo} en ingeniería en computación.` });
    }
});

// Ruta para inscripción de materia por carrera seleccionada
app.post('/api/inscripcion/:carrera', (req, res) => {
    const carrera = req.params.carrera;
    if (req.body && req.body.materias) {
        materiasInscritas = req.body.materias;
      } else {
        // Manejar el caso en que req.body o req.body.materias no existan
        res.status(400).json({ mensaje: 'Datos de materias no proporcionados correctamente.' });
      }
    
    // Función para calcular el total de UV de las materias inscritas
    const calcularTotalUV = (materiasInscritas) => {
      return materiasInscritas.reduce((totalUV, materia) => totalUV + materia.unidadesValorativas, 0);
    };
  
    // Define el límite de UV requeridas según la carrera
    let limiteUVRequeridas;
  
    // Determina el límite de UV requeridas según la carrera seleccionada
    if (carrera === "tecnico") {
      limiteUVRequeridas = 20; // Supongamos que el límite para el técnico es 20 UV
    } else if (carrera === "ingenieria") {
      limiteUVRequeridas = 24; // Supongamos que el límite para ingeniería es 24 UV
    } else {
      res.status(400).json({ mensaje: `Carrera "${carrera}" no válida.` });
      return; // Detiene la ejecución si la carrera no es válida
    }
  
    // Valida si la cantidad de UV inscritas supera el límite requerido
    if (calcularTotalUV(materiasInscritas) > limiteUVRequeridas) {
      res.status(400).json({ mensaje: `Excedido el límite de UV requeridas (${limiteUVRequeridas}).` });
    } else {
      for (const materia of materiasInscritas) {
        // Verificar si la materia ya existe en el arreglo de inscripciones
        const materiaExistente = materiasInscritas.find(inscrita => inscrita.codigo === materia.codigo);
        if (materiaExistente) {
          res.status(400).json({ mensaje: `La materia ${materia.codigo} ha sido inscrita.` });
          return; // Detiene la ejecución si ya existe
        }
      }
      inscripciones.push(...materiasInscritas);
      res.json({ mensaje: `Inscripción exitosa de materias.` });
    }
});

// Ruta para eliminar inscripciones de materias
app.delete('/api/inscripcion/:carrera/:codigo', (req, res) => {
    const carrera = req.params.carrera;
    const codigo = req.params.codigo;
  
    // Busca el índice de la materia en el arreglo de inscripciones
    const indiceMateria = materiasInscritas.findIndex(materia => materia.codigo === codigo);
  
    if (indiceMateria !== -1) {
      // Si se encuentra la materia en el arreglo de inscripciones, eliminarla
      materiasInscritas.splice(indiceMateria, 1);
      res.json({ mensaje: `Materia con código ${codigo} eliminada de la inscripción.` });
    } else {
      // Si la materia no se encuentra en la inscripción, devolver un mensaje de error
      res.status(404).json({ mensaje: `Materia con código ${codigo} no encontrada en la inscripción.` });
    }
});

// Ruta para mostrar las inscripciones de materias realizadas
app.get('/api/materias-inscritas', (req, res) => {
    // Verificar si hay materias inscritas
    if (materiasInscritas && materiasInscritas.length > 0) {
      res.json({ materiasInscritas: materiasInscritas });
    } else {
      res.json({ mensaje: 'No hay materias inscritas.' });
    }
  });

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
