function Gira_D (avanzar_: boolean) {
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P12, 0)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 154)
}
function Avanza (avanzar_: boolean) {
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P12, 1)
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 154)
}
function Retroceder (avanzar_: boolean) {
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P12, 1)
    basic.pause(500)
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 154)
}
function Gira_I (avanzar_: boolean) {
    pins.digitalWritePin(DigitalPin.P8, 1)
    pins.digitalWritePin(DigitalPin.P12, 0)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 154)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
}
let Distancia = Math.round(maqueen.Ultrasonic(PingUnit.Centimeters))
pins.digitalWritePin(DigitalPin.P12, 1)
pins.digitalWritePin(DigitalPin.P8, 1)
basic.forever(function () {
    Distancia = Math.round(maqueen.Ultrasonic(PingUnit.Centimeters))
    if (Distancia > 5) {
        basic.showNumber(Distancia)
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
            Retroceder(true)
        }
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            Avanza(true)
        }
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
            Gira_I(true)
        }
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            Gira_D(true)
        }
    } else {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
        pins.digitalWritePin(DigitalPin.P8, 0)
        pins.digitalWritePin(DigitalPin.P12, 0)
        basic.pause(500)
        pins.digitalWritePin(DigitalPin.P8, 1)
        pins.digitalWritePin(DigitalPin.P12, 1)
        basic.showNumber(Distancia)
        basic.pause(500)
    }
})
