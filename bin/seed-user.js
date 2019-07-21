const mongoose = require("mongoose")
const User = require("../models/User")

mongoose.connect('mongodb://localhost/proyecto-modulo-dos')


const user = [{
    username: 'SHQ',
    contactName: 'Arturo Magaña',
    email: 'arturo.magana@shq.com.mx',
    companyName: 'Suministros Herbolarios y Químicos, S.A. de C.V.',
    rfc: 'SHQ1403107G5',
    taxAddress: 'Pino 18, Las Rosas, Tlalnepantla de Baz, Estado de México, CP 54069',
    deliveryAddress: 'Pino 18, Las Rosas, Tlalnepantla de Baz, Estado de México, CP 54069',
    password: '9564'
  },
]


User.create(user).then(() => {
  console.log('se creo usuario nuevo')
  mongoose.connection.close()
}).catch((err) => {
  console.log(err)
})