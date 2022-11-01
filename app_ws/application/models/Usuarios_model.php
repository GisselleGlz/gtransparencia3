<?php
class Usuarios_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->load->model('usuarios_model');
        $this->load->helper('correo');
    }

    // Función para obtener la lista de tipos de usuarios
    public function obtenerTiposDeUsuario()
    {
        $this->db
        ->select('*')
        ->from('roles')
        ->where('rol  != ', 'ciudadano');

        $tiposDeUsuario= $this->db->get()->result_array();

        $respuesta = array(
            'respuesta' => $tiposDeUsuario,
            'status' => REST_Controller::HTTP_OK
        );

        return $respuesta;
    }

    // Función para obtener el tipo de usuario basado en el ID
    public function obtenerTipoDeUsuario($idUsuario)
    {
        $this->db
        ->select('tipo')
        ->from('usuarios')
        ->where('idusuario = ', $idUsuario);
        
        $tipoDeUsuario =  $this->db->get()->row_array()["tipo"];

        $respuesta = array(
            'respuesta' => $tipoDeUsuario,
            'status' => REST_Controller::HTTP_OK
        );

        return $respuesta;
    }

    // Función para obtener la lista de usuarios activos
    public function obtenerUsuarios()
    {
        $this->db
        ->select('*')
        ->from('usuarios')
        ->where('activo = ', 1);

        $usuarios = $this->db->get()->result_array();

        $respuesta = array(
            'respuesta' => $usuarios,
            'status' => REST_Controller::HTTP_OK
        );

        return $respuesta;
    }


   
    public function obtenerUsuario()
    {
        $idusuario = $this->uri->segment(3);
        $where =  array('idusuario' => $idusuario);
        $query = $this->db->select("*")->get_where('view_usuarios', $where);

        if ($query && $query->num_rows() >= 1) {
            $data = $query->row();
            $respuesta = array(
                    'mensaje' => 'Registros cargado correctamente',
                    'registro' => $data,
                    'status' => 200,
                );
        } else {
            $respuesta = array(
                'mensaje' => 'Error al cargar registros',
                'status' => 400,
            );
        }
        return $respuesta;
    }


    public function existe_correo($data)
    {
        $correo = $data["correo"];
        $idusuario = $data["idusuario"];
        if ($idusuario > 0) {
            $this->db->where_not_in('idusuario', [$idusuario]);
        }
        $existe = (bool) $this->db->select('idusuario')->from('usuarios')->where('correo', $correo)->count_all_results();

        $respuesta = array(
            'respuesta' => $existe,
            'status' => REST_Controller::HTTP_ACCEPTED
        );
        return $respuesta;
    }



    public function agregarUsuario($datos)
    {
        $idusuario = $datos['idusuario'];
        $password = $datos['password'];
        if (!empty($password)) {
            $password = password_hash($password, PASSWORD_BCRYPT);
        }

   
        $data = array(
            'tipo' =>  $datos['idtipo_usuario'],
            'nombre' => $datos['nombre'],
            'correo' => $datos['correo'],
            'password' => $password,
            'activo' => $datos['activo'],
        );
        if ($idusuario > 0) {
            if (empty($password)) {
                $data = array(
                    'tipo' =>  $datos['idtipo_usuario'],
                    'nombre' => $datos['nombre'],
                    'correo' => $datos['correo'],
                );
            }
            $this->db->where('idusuario', $idusuario);
            $this->db->update('usuarios', $data);
            $id = $idusuario;
        } else {
            $this->db->insert('usuarios', $data);
            $id = $this->db->insert_id();

            if ($datos['idtipo_usuario'] == 5) {
                $dataLegal = array(
                    'abogada' => $datos['nombre'],
                    'idusuario' =>  $id,
                );
                $this->db->insert('abogadas', $dataLegal);
                $idd = $this->db->insert_id();
            }

            if ($datos['idtipo_usuario'] == 4) {
                $dataPsicologia = array(
                    'psicologa' => $datos['nombre'],
                    'idusuario' =>  $id,
                );
                $this->db->insert('psicologas', $dataPsicologia);
                $idd = $this->db->insert_id();
            }


        }

        if (
            $this->db->trans_status() === false
        ) {
            $this->db->trans_rollback();
            $respuesta = array(
                'mensaje' => 'Error en inserción.',
                'error' => $this->db->error(),
                'status' => 409,
            );
        } else {
            $this->db->trans_commit();
            $respuesta = array(
                'mensaje' => 'Inserción correcta',
                'status' => 200,
            );
        }
        return $respuesta;
    }




    // public function agregarRegistro($datos)
    // {
    //     $idusuario = $datos['idusuario'];
    //     $password = $datos['password'];
    //     $password2 = $datos['password'];
    //     $tipo = $datos['idtipo_usuario'];
    //     if (!empty($password)) {
    //         $password = password_hash($password, PASSWORD_BCRYPT);
    //     }
    //     $data = array(
    //         'tipo' =>  $datos['idtipo_usuario'],
    //         'nombre' => $datos['nombre'],
    //         'correo' => $datos['correo'],
    //         'password' => $password,
    //         'activo' => $datos['activo'],
    //     );

    //     $dataCorreo = array(
    //         'tipo' =>  $datos['idtipo_usuario'],
    //         'nombre' => $datos['nombre'],
    //         'correo' => $datos['correo'],
    //         'password' => $password,
    //         'activo' => $datos['activo'],
    //         'password2' => $password2,
    //     );
    //         //Enviando el correo al usuario
    //         if ($tipo == 3) {
    //             correo($dataCorreo);
    //         }
    //         $this->db->insert('usuarios', $data);
    //         $id = $this->db->insert_id();
      
    //     if (
    //         $this->db->trans_status() === false
    //     ) {
    //         $this->db->trans_rollback();
    //         $respuesta = array(
    //             'mensaje' => 'Error en inserción.',
    //             'error' => $this->db->error(),
    //             'status' => 409,
    //         );
    //     } else {
    //         $this->db->trans_commit();
    //         $respuesta = array(
    //             'mensaje' => 'Inserción correcta',
    //             'status' => 200,
    //         );
    //     }
    //     return $respuesta;
    // }


    // public function obtenerEmpleado()
    // {
    //     $Empleado = $this->uri->segment(3);
    //     $where =  array('clave' => $Empleado);
    //     $query = $this->db->select("*")->get_where('empleados', $where);

    //     if ($query && $query->num_rows() >= 1) {
    //         $data = $query->row();
    //         $respuesta = array(
    //             'mensaje' => 'Registros cargado correctamente',
    //             'registro' => $data,
    //            'query' => $this->db->last_query(),
    //             'status' => 200,
    //         );
    //     } else {
    //         $respuesta = array(
    //             'mensaje' => 'Error al cargar registros',
    //             'registro' => null,
    //             'query' => $this->db->last_query(),
    //             'status' => 200,
    //         );
    //     }
    //     return $respuesta;
    // }

    public function cambiarEstado($idUsuario)
    {
        $this->db->trans_begin();
        
        $this->db
        ->set('activo', 'NOT activo', FALSE)
        ->where('idusuario', $idUsuario)
        ->update('usuarios');

        if($this->db->trans_status() === FALSE)
        {
            $this->db->trans_rollback();

            $respuesta = "Ocurrio un error, vuelva a intentar.";
            $status = REST_Controller::HTTP_INTERNAL_SERVER_ERROR;
        }

        else
        {
            $this->db->trans_commit();   

            $respuesta = "Estado actualizado correctamente";
            $status = REST_Controller::HTTP_OK;
        }    

        return array(
            'respuesta' =>  $respuesta,
            'status' => $status
        );
    }

    public function paginado($datos)
    {
        $this->load->library('paginado');
        $paginado = $this->paginado->paginar($datos, 'usuarios');
        
        $respuesta = array(
            'respuesta' => $paginado,
            'status' => REST_Controller::HTTP_OK
        );

        return $respuesta;
    }
}
 