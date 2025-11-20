// Cargar servicios
axios.get('http://localhost:3000/api/servicios')
  .then(res => {
    const select = document.getElementById('servicio');
    select.innerHTML = '<option value="">Selecciona un servicio</option>';
    res.data.forEach(s => {
      select.innerHTML += `<option value="${s.id}">${s.nombre} - S/ ${s.precio}</option>`;
    });
  })
  .catch(err => console.error('Error cargando servicios:', err));

// Cargar barberos
axios.get('http://localhost:3000/api/barberos')
  .then(res => {
    const select = document.getElementById('barbero');
    select.innerHTML = '<option value="">Selecciona un barbero</option>';
    res.data.forEach(b => {
      select.innerHTML += `<option value="${b.id}">${b.nombres} ${b.apellidos}</option>`;
    });
  })
  .catch(err => console.error('Error cargando barberos:', err));

// Cargar sedes
axios.get('http://localhost:3000/api/sedes')
  .then(res => {
    const select = document.getElementById('sede');
    select.innerHTML = '<option value="">Selecciona una sede</option>';
    res.data.forEach(sede => {
      select.innerHTML += `<option value="${sede.id}">${sede.nombre} - ${sede.direccion}</option>`;
    });
  })
  .catch(err => console.error('Error cargando sedes:', err));

// Enviar reserva
document.getElementById('reserva-form').addEventListener('submit', async e => {
  e.preventDefault();
  const reserva = {
    nombre: document.getElementById('nombre').value,
    telefono: document.getElementById('telefono').value,
    servicio_id: document.getElementById('servicio').value,
    barbero_id: document.getElementById('barbero').value,
    sede_id: document.getElementById('sede').value,
    fecha: document.getElementById('fecha').value,
    hora: document.getElementById('hora').value
  };

  try {
    const res = await axios.post('http://localhost:3000/api/eventos', reserva);
    alert('Reserva guardada con ID: ' + res.data.id);
    document.getElementById('reserva-form').reset();
  } catch(err) {
    console.error(err);
    alert('Error al guardar reserva');
  }
});
