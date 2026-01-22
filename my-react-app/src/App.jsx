function App() {

  return (
    <div>
      <h1> 5°A EVND</h1>
      <h2> Maestro: Ricardo Luna Santos</h2>
      <h2>Alumna: Johana Karen Barragan Marquez</h2>
      <UserComponent />
      <ProfileComponet />
      <FreedComponent />

    </div>
  )
}

function UserComponent() {
  const nombre = 'Johana'; /*CONSTpara hacer una costante, que siempre su valor es el mismo*/
  const apellidos = 'Barragan Marquez';
  const nombrecompleto = <h2>El nombre es: {nombre} y sus apellidos son: {apellidos}</h2>; /*mostrar el valor de una contante o variable y para eso se muestran a traves de llaves*/
  return <h1>User Component {nombrecompleto}</h1>;
}

function ProfileComponet() { /*USER.MAP de la lista va a mapiar, user va almacenar cada elemento que encuentre TEMPORALMENTE Y AL RETORNAR*/
  const users = [
    { id: 1, name: 'Jocsan', role: 'Web Developer' },
    { id: 2, name: 'Mary', role: 'Web Designer' },
    { id: 3, name: 'Sheila', role: 'Team Leader' },
  ]
  return (
    <>
      <p>Lista de usuarios del sistema</p>
      <ul>
        {
          users.map(function (user, index) {
            return (
              <li key={index}>{user.name} es un {user.role}</li>
            )
          })
        }
      </ul>
    </>
  )
}

function FreedComponent() {
  const materiales = [
    { id: 1, nombre: 'Cemento' },
    { id: 2, nombre: 'Ladrillos' },
    { id: 3, nombre: 'Arena' },
    { id: 4, nombre: 'Varillas de acero' },
  ]

  return (
    <>
      <h1>Materiales de Construcción</h1>
      <ul>
        {materiales.map((material) => (
          <li key={material.id}>{material.nombre}</li>
        ))}
      </ul>
    </>
  )
}


export default App
