<?php
class archivos_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->load->model('archivos_model');
    }

    // Función para obtener la lista de tipos de usuarios


    // Función para obtener el tipo de usuario basado en el ID
    public function obtenerTipoDeCargo($idCargo)
    {
        $this->db
        ->select('tipo')
        ->from('cargos')
        ->where('idcargo = ', $idCargo);
        
        $tipoDeCargo =  $this->db->get()->row_array()["tipo"];

        $respuesta = array(
            'respuesta' => $tipoDeCargo,
            'status' => REST_Controller::HTTP_OK
        );

        return $respuesta;
    }

    // Función para obtener la lista de usuarios activos
    public function obtenerCargos()
    {
        $this->db
        ->select('*')
        ->from('empleados')
        ->where('clave >= ', 1);

        $cargos = $this->db->get()->result_array();

        $respuesta = array(
            'respuesta' => $cargos,
            'status' => REST_Controller::HTTP_OK
        );

        return $respuesta;
    }

 
    public function obtenerCargo()
    {
        $id = $this->uri->segment(3);
        $where =  array('id' => $id);
        $query = $this->db->select("*")->get_where('empleados', $where);

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


  



    public function agregarRegistro($datos)
    {
           $nombre=    $datos['nombre'];
          //  $this->db->insert('primer_registro', $data);
            $idregistro = $this->db->insert_id();
            $data2 = array(
                'idregistro' => $idregistro,
            );
        
            if (count($_FILES) > 0) {
                if (!is_dir('./assets/documentos/' . $idregistro . '/')) {
                    mkdir('./assets/documentos/' . $idregistro . '/', 0777, true);
                }

                $config['upload_path'] = './assets/documentos/' . $idregistro . '/';
                $config['encrypt_name'] = true;
                $config['allowed_types'] = 'png|jpg|jpeg|pdf';
                $config['max_size'] = '2000 KB';

                foreach ($_FILES as $name => $doc) {

                    $this->load->library("upload", $config);
                    if ($this->upload->do_upload($name)) {
                        $data = array("upload_data" => $this->upload->data());
                        $ruta = "documentos/" . $idregistro . '/' . $this->upload->data('file_name');
                        $data_documento = array(
                            'idregistro' => $idregistro,
                            'nombre' => $nombre,
                            //'idusuario' => $idusuario,
                            'ruta' => $ruta,
                        );
                        $this->db->insert('documentos', $data_documento);
                    }
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

    public function consultar()
    {
        $idregistro = $this->uri->segment(3);

         $where = array('idregistro' => $idregistro);
         $query = $this->db->get_where('documentos', $where, 1);

        $whereDocumentos = array('idregistro' => $idregistro);
        $docs = $this->db->get_where('documentos', $whereDocumentos)->result();
        foreach ($docs as $doc) {
            $doc->ruta = RUTA_IMG . $doc->ruta;
            $doc->guardado = 1;
            $pdf = substr($doc->ruta, -3);
            if ($pdf == 'pdf') {
                $doc->type = 'application/pdf';
            } else {
                $doc->type = substr($doc->ruta, -3);
            }
        }



     //   $idregistro = $this->uri->segment(3);
      //  $where =  array('idregistro' => $idregistro);
      //  $query = $this->db->select("*")->get_where('primer_registro', $where);

        if ($query && $query->num_rows() >= 1) {
            $data = $query->row();
            //VAR---'registro' => $data, -- no cambiar
            $respuesta = array(
                'mensaje' => 'Registros cargado correctamente',
                'registro' => $data,
                'documentos' => $docs,
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


    // public function cambiarEstado($idCargo)
    // {
    //     $this->db->trans_begin();

    //     $this->db
    //     ->set('activo', 'NOT activo', FALSE)
    //     ->where('idcargo', $idCargo)
    //     ->update('cargos');

    //     if($this->db->trans_status() === FALSE)
    //     {
    //         $this->db->trans_rollback();

    //         $respuesta = "Ocurrio un error, vuelva a intentar.";
    //         $status = REST_Controller::HTTP_INTERNAL_SERVER_ERROR;
    //     }

    //     else
    //     {
    //         $this->db->trans_commit();   

    //         $respuesta = "Estado actualizado correctamente";
    //         $status = REST_Controller::HTTP_OK;
    //     }    

    //     return array(
    //         'respuesta' =>  $respuesta,
    //         'status' => $status
    //     );
    // }

    ///Paginado
    public function paginado($datos)
    {
        $this->load->library('paginado');
        $paginado = $this->paginado->paginar($datos, 'primer_registro');

        $respuesta = array(
            'respuesta' =>  $paginado,
            'status' => REST_Controller::HTTP_OK
        );

        return $respuesta;
    }

    public function obtenerRegistro()
    {
        $idregistro = $this->uri->segment(3);
        $where =  array('idregistro' => $idregistro);
        $query = $this->db->select("*")->get_where('primer_registro', $where);

        if ($query && $query->num_rows() >= 1) {
            $data = $query->row();
            //VAR---'registro' => $data, -- no cambiar
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


    public function eliminar_doc($datos)
    {

        $iddocumento = $datos['iddocumento'];
        $query = $this->db->select('ruta')->from('documentos')->where('iddocumento', $iddocumento)->limit(1)->get();
        $ruta = $query->row('ruta');

        if (file_exists("./assets/{$ruta}")) {
            unlink("./assets/{$ruta}");
        }
        $this->db->trans_begin();

        $delete = $this->db->delete('documentos', array('iddocumento' => $iddocumento));

        if ($this->db->trans_status() === false) {

            $this->db->trans_rollback();
            $respuesta = array(
                'mensaje' => 'Error en eliminación del documento.',
                'status' => 409,
            );
        } else {
            $this->db->trans_commit();
            $respuesta = array(
                'mensaje' => 'Documento eliminado correctamente.',
                'status' => 200,
            );
        }

        return $respuesta;
    }
}
 