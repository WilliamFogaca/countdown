export default class Countdown {
  constructor(futureDate) {
    this.futureDate = futureDate;
    this.verificaCountdown = true;
  }

  get _actualDate() {
    return new Date();
  }

  get _futureDate() {
    return new Date(this.futureDate);
  }

  get _timeStampDiff() {
    const timeStampDiff = this._futureDate.getTime() - this._actualDate.getTime();
    if (timeStampDiff < 0) {
      return false;
    } else {
      return timeStampDiff;
    }

  }

  get daysHoursMinutesSeconds() {
    return {
      days: Math.floor(this._timeStampDiff / (24 * 60 * 60 * 1000)),
      hours: Math.floor(this._timeStampDiff / (60 * 60 * 1000)),
      minutes: Math.floor(this._timeStampDiff / (60 * 1000)),
      seconds: Math.floor(this._timeStampDiff / (1000)),
    }
  }

  get total() {
    const days = this.daysHoursMinutesSeconds.days;
    const hours = this.daysHoursMinutesSeconds.hours % 24;
    const minutes = this.daysHoursMinutesSeconds.minutes % 60;
    const seconds = this.daysHoursMinutesSeconds.seconds % 60;
    return {
      days,
      hours,
      minutes,
      seconds
    }
  }

  doCountdown(element, diaEspecial) {
    this.verificaCountdown = true;
    const countdown = setInterval(() => {
      if(this.verificaCountdown) {
        if (this.total.days <= 0 && this.total.hours <= 0 && this.total.minutes <= 0 && this.total.seconds <= 0) {
          element.innerText = `O ${diaEspecial} já passou. Ajuste a data para fazer a contagem regressiva novamente!`;
          clearInterval(countdown);
        } else {
          element.innerText = `Faltam ${this.total.days} dias, ${this.total.hours} horas, ${this.total.minutes} minutos e ${this.total.seconds} segundos para o ${diaEspecial}!`;
        }
      }else {
        clearInterval(countdown);
      }
    }, 1000);
  }

  deleteCountdown(element) {
    const div = document.querySelector(`[data-container-countdown="${element}"]`);
    if(div) {
      div.remove();
      this.verificaCountdown = false;
    }
  }

}