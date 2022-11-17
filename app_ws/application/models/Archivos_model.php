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
           $numero =    $datos['numero'];
          //  $this->db->insert('primer_registro', $data);
            $iddocumento = $this->db->insert_id();
 
            if (count($_FILES) > 0) {
                if (!is_dir('./assets/documentos/' . $numero . '/')) {
                    mkdir('./assets/documentos/' . $numero . '/', 0777, true);
                }

                $config['upload_path'] = './assets/documentos/' . $numero . '/';
                $config['encrypt_name'] = true;
                $config['allowed_types'] = 'png|jpg|jpeg|pdf';
                $config['max_size'] = '10000 KB';

                foreach ($_FILES as $name => $doc) {

                    $this->load->library("upload", $config);
                    if ($this->upload->do_upload($name)) {
                        $data = array("upload_data" => $this->upload->data());
                        $ruta = "documentos/" . $numero . '/' . $this->upload->data('file_name');
                        $data_documento = array(
                        'iddocumento' => $iddocumento,
                            'nombre' => $nombre,
                            'idregistro' => $numero,
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


    public function editarObra($datos)
    {
        $iddocumento = $datos['iddocumento'];
        $data = array(
            'nombre' => $datos['nombre'],
            'idregistro' => $datos['numero'],
        );

        if ($iddocumento > 0) {
            $this->db->set($data)->where('iddocumento', $iddocumento)->update('documentos');
        } 
        // else {
        //     $this->db->insert('roles_responsables', $data);
        // }
        if ($this->db->trans_status() === false) {
            $this->db->trans_rollback();
            $respuesta = array(
                'mensaje' => 'Error',
                'error' => $this->db->error(),
                'status' => 409,
            );
        } else {
            $this->db->trans_commit();
            $respuesta = array(
                'mensaje' => 'Operación correcta',
                'iddoc' => $iddocumento,
                'status' => 201
            );
        }
        return $respuesta;
    }

    public function getObras()
    {
        $whereDocumentos = array('iddocumento >= 0');
        $docs = $this->db->order_by('idregistro', 'DESC')->get_where('documentos', $whereDocumentos)->result();
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
        if ($this->db->trans_status() === false) {

            $this->db->trans_rollback();
            $respuesta = array(
                'mensaje' => 'Registros cargado correctamente',
                'documentos' => $docs,
                'status' => 200,
            );
        } else {
            $this->db->trans_commit();
            $respuesta = array(
                'mensaje' => 'Registros:::',
                'documentos' => $docs,
                'status' => 200,
            );
        }

        return $respuesta;

       
    }


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



    public function agregarAdquisicion($datos)
    {
        $nombre =    $datos['nombre'];
        $numero =    $datos['numero'];
        //  $this->db->insert('primer_registro', $data);
        $iddocumento = $this->db->insert_id();

        if (count($_FILES) > 0) {
            if (!is_dir('./assets/adquisiciones/' . $numero . '/')) {
                mkdir('./assets/adquisiciones/' . $numero . '/', 0777, true);
            }

            $config['upload_path'] = './assets/adquisiciones/' . $numero . '/';
            $config['encrypt_name'] = true;
            $config['allowed_types'] = 'png|jpg|jpeg|pdf';
            $config['max_size'] = '10000 KB';

            foreach ($_FILES as $name => $doc) {

                $this->load->library("upload", $config);
                if ($this->upload->do_upload($name)) {
                    $data = array("upload_data" => $this->upload->data());
                    $ruta = "adquisiciones/" . $numero . '/' . $this->upload->data('file_name');
                    $data_documento = array(
                        'iddocumento' => $iddocumento,
                        'nombre' => $nombre,
                        'numero' => $numero,
                        'ruta' => $ruta,
                    );
                    $this->db->insert('adquisiciones', $data_documento);
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


    public function editarAdquisicion($datos)
    {
        $iddocumento = $datos['iddocumento'];
        $data = array(
            'nombre' => $datos['nombre'],
            'numero' => $datos['numero'],
        );

        if ($iddocumento > 0) {
            $this->db->set($data)->where('iddocumento', $iddocumento)->update('adquisiciones');
        }
        // else {
        //     $this->db->insert('roles_responsables', $data);
        // }
        if ($this->db->trans_status() === false) {
            $this->db->trans_rollback();
            $respuesta = array(
                'mensaje' => 'Error',
                'error' => $this->db->error(),
                'status' => 409,
            );
        } else {
            $this->db->trans_commit();
            $respuesta = array(
                'mensaje' => 'Operación correcta',
                'iddoc' => $iddocumento,
                'status' => 201
            );
        }
        return $respuesta;
    }
    public function getAdquisicion()
    {
        $whereDocumentos = array('numero >= 0');
        $docs = $this->db->order_by('numero', 'DESC')->get_where('adquisiciones', $whereDocumentos)->result();
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
        if ($this->db->trans_status() === false) {

            $this->db->trans_rollback();
            $respuesta = array(
                'mensaje' => 'Registros cargado correctamente',
                'documentos' => $docs,
                'status' => 200,
            );
        } else {
            $this->db->trans_commit();
            $respuesta = array(
                'mensaje' => 'Registros:::',
                'documentos' => $docs,
                'status' => 200,
            );
        }

        return $respuesta;
    }


    public function eliminar_ad($datos)
    {

        $iddocumento = $datos['iddocumento'];
        $query = $this->db->select('ruta')->from('adquisiciones')->where('iddocumento', $iddocumento)->limit(1)->get();
        $ruta = $query->row('ruta');

        if (file_exists("./assets/{$ruta}")) {
            unlink("./assets/{$ruta}");
        }
        $this->db->trans_begin();

        $delete = $this->db->delete('adquisiciones', array('iddocumento' => $iddocumento));

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
 