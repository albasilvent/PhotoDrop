//Funcion que devuelve un timestamp x cantidad de minutos en el futuro
    function getTimestampMinutesFromNow(minutes) {
      let timestamp= Date.now() + minutes * 60 * 1000
      return timestamp;
    }

    module.exports= {getTimestampMinutesFromNow};