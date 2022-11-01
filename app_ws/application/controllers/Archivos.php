<?php
defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';
require APPPATH . '/helpers/jwt_helper.php';
include APPPATH . '/third_party/jwt/JWT.php';
include APPPATH . '/third_party/jwt/BeforeValidException.php';
include APPPATH . '/third_party/jwt/ExpiredException.php';
include APPPATH . '/third_party/jwt/SignatureInvalidException.php';

use Firebase\JWT\JWT;

class Archivos extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();
        $token = $this->input->get_request_header('Authorization', true);
        $token = Jwt_helper::verificarToken($token);

        if($token["status"] == 'HTTP_UNAUTHORIZED')
        {
             // Devolviendo el mensaje de error con un codigo 401 HTTP_UNAUTHORIZED
             $this->response($token["message"], REST_Controller::HTTP_UNAUTHORIZED);
        }
        $this->load->model('archivos_model');
    }


    public function tiposcargo_get()
    {

        // Devolviendo el menú con un codigo 200 HTTP_OK
        $respuesta = $this->archivos_model->obtenerTiposDeCargo();
        $this->response($respuesta["respuesta"], $respuesta["status"]);
    }

    // public function cargo_get($idCargo = 0)
    // {
    //     if ($idCargo != 0) {
    //         $this->response($this->archivos_model->obtenerCargo($idCargo), REST_Controller::HTTP_OK);
    //     } else {
    //         $this->response($this->archivos_model->obtenerCargos(), REST_Controller::HTTP_OK);
    //     }
    // }


    // public function index_post()
    // {
    //     $post = (array) json_decode($this->post('form'));
    //     $respuesta = $this->archivos_model->agregarRegistro($post);

    //     if ($respuesta["status"] == '200')
    //         $this->response($respuesta["mensaje"], REST_Controller::HTTP_OK);


    //     else
    //         $this->response($respuesta["mensaje"], REST_Controller::HTTP_INTERNAL_SERVER_ERROR);
    // }



    public function agregar_post()
    {
        $this->load->model('archivos_model');
        $data = (array) json_decode($this->post('data'));
        $respuesta = $this->archivos_model->agregarRegistro($data, $this->post());
        $this->response($respuesta, $respuesta['status']);
    }

    // Obtener el paginador
    public function registrospag_post()
    {
        $this->load->model('archivos_model');
        $respuesta = $this->archivos_model->paginado($this->post());
        $this->response($respuesta["respuesta"], $respuesta["status"]);
    }

    public function registro_get()
    {
        $respuesta = $this->archivos_model->obtenerRegistro($this->get());
        $this->response($respuesta, $respuesta['status']);
    }

    public function eliminar_doc_post()
    {
        $this->load->model('archivos_model');
        $respuesta = $this->archivos_model->eliminar_doc($this->post());
        $this->response($respuesta);
    }


    public function registroimg_get()
    {
        $this->load->model('archivos_model');
        $respuesta = $this->archivos_model->consultar($this->get());
        $this->response($respuesta, $respuesta['status']);
    }

    // Obtener el paginador
    // public function cargospag_post()
    // {
    //     $this->load->model('cargos_model');
    //     $respuesta = $this->cargos_model->paginado($this->post());
    //     $this->response($respuesta["respuesta"], $respuesta["status"]);
    // }

    //  public function cambiar_estado_put($idCargo = 0)
    //  {
    //     $respuesta = $this->cargos_model->cambiarEstado($idCargo);

    //     $this->response($respuesta["respuesta"], $respuesta['status']);
    //  }

}