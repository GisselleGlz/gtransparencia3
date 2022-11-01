<?php
defined('BASEPATH') or exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';
require APPPATH . '/helpers/jwt_helper.php';
include APPPATH . '/third_party/jwt/JWT.php';
include APPPATH . '/third_party/jwt/BeforeValidException.php';
include APPPATH . '/third_party/jwt/ExpiredException.php';
include APPPATH . '/third_party/jwt/SignatureInvalidException.php';

use Firebase\JWT\JWT;

class Agendas extends REST_Controller
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
        $this->load->model('agendas_model');
    }


    

   

    // Obtener el paginador
    public function agendaspag_post()
    {
        $this->load->model('agendas_model');
        $respuesta = $this->agendas_model->paginado($this->post());
        $this->response($respuesta["respuesta"], $respuesta["status"]);
    }

    public function agregar_post()
    {
        $post = (array) json_decode($this->post('form'));
        $respuesta = $this->agendas_model->agregarEntrevista($post);
        $this->response($respuesta, $respuesta['status']);
    }


    public function eliminar_evento_post()
    {
        $post = (array) json_decode($this->post('form'));
        $respuesta = $this->agendas_model->eliminar_evento($post);
        $this->response($respuesta, $respuesta['status']);
    }

    // public function registro_get()
    // {
    //     $respuesta = $this->entrevista_model->obtenerRegistro($this->get());
    //     $this->response($respuesta, $respuesta['status']);
    // }

    public function index_get()
    {
        $respuesta = $this->agendas_model->obtenerTiposSector();
        $this->response($respuesta["respuesta"], $respuesta["status"]);
    }

    public function registro_get()
    {
        $respuesta = $this->agendas_model->obtenerRegistro($this->get());
        $this->response($respuesta, $respuesta['status']);
    }


   
    public function psicologiapag_get()
    {
        $agendas_model = new agendas_model();
        $this->response($agendas_model->paginadoPsicologia(), REST_Controller::HTTP_OK);
    }

 


    public function Notas_get()
    {
        // $respuesta = $this->agendas_model->obtenerNotas($this->get());
        // $this->response($respuesta, $respuesta['status']);
        $agendas_model = new agendas_model();
        $this->response($agendas_model->obtenerNotas(), REST_Controller::HTTP_OK);
    }


    public function Formatos_get()
    {
        $agendas_model = new agendas_model();
        $this->response($agendas_model->obtenerFormatos(), REST_Controller::HTTP_OK);
    }



    // public function citas_get()
    // {
    //     $agendas_model = new agendas_model();
    //     $this->response($agendas_model->obtenerAgenda(), REST_Controller::HTTP_OK);
    // }


    public function psicologa_get()
    {
        $respuesta = $this->agendas_model->psicologa($this->get());
        $this->response($respuesta, $respuesta['status']);
    }


   



    public function registros_get()
    {
        $agendas_model = new agendas_model();
        $this->response($agendas_model->Registros(), REST_Controller::HTTP_OK);
    }

}