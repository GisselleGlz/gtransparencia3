<?php

    function cargarArchivo($archivos, $carpeta)
    {
        $respuesta = array(
            'mensaje' => "",
            'error' => false,
        );

        if(isset($_FILES[$archivos]))
        {
            // Obteniendo el total
            $total = count($_FILES[$archivos]["name"]);

            // Creando carpeta para guardar las imagenes si no existen
            if (!is_dir($carpeta . '/')) 
            {
                mkdir($carpeta . '/', 0777, true);
            }

            for($i=0; $i < $total; $i++)
            {
                if(!empty($_FILES[$archivos]['name'][$i]))
                { 
                     // Creando un nuevo archivo temporal
                    $_FILES['file']['name'] = $_FILES[$archivos]['name'][$i];
                    $_FILES['file']['type'] = $_FILES[$archivos]['type'][$i];
                    $_FILES['file']['tmp_name'] = $_FILES[$archivos]['tmp_name'][$i];
                    $_FILES['file']['error'] = $_FILES[$archivos]['error'][$i];
                    $_FILES['file']['size'] = $_FILES[$archivos]['size'][$i];

                    // Configuración para el archivo a subir
                    $config['upload_path'] = $carpeta . '/';
                    $config['allowed_types'] = "pdf";
                    //50001
                    $config['max_size'] = "50001 KB";
                    $config['encrypt_name'] = true;

                    // Obteniendo la instancia de Codeigniter
                    // Para poder acceder a la propiedad upload
                    $CI =& get_instance();
                    $CI->load->library('upload', $config);

                    $respuesta;

                    if(!$CI->upload->do_upload("file")) 
                    {
                        $error = array('error' => $CI->upload->display_errors());
                         // Si ocurre algún error con una imágen se eliminan los archivos ya subidos
                        array_map( 'unlink', array_filter( (array) glob($carpeta . '/*') ) );

                        //Se elimina la carpeta contenedora, esto con la finalidad de que vuelva a subir los archivos ya corregidos
                        rmdir($carpeta . '/');

                        $respuesta["mensaje"] = $error["error"];
                        $respuesta["error"] = true;
                    }
                    /*
                    else
                    {
                        $respuesta["mensaje"] = 'Archivo subido correctamente';
                        $respuesta["error"] = false;
                    }
                    */
                    return $respuesta;
                }
            }
        }
    }
    
    function actualizarArchivo($archivos,$carpeta,$rutaArchivoActual)
    {
        $respuesta = array(
            'mensaje' => "",
            'error' => false,
        );
        
        if(isset($_FILES[$archivos]))
        {
            // Obteniendo el total
            $total = count($_FILES[$archivos]["name"]);

            // Creando carpeta para guardar las imagenes si no existen
            if (!is_dir($carpeta . '/')) 
            {
                mkdir($carpeta . '/', 0777, true);
            }

            for($i=0; $i < $total; $i++)
            {
                if(!empty($_FILES[$archivos]['name'][$i]))
                { 
                     // Creando un nuevo archivo temporal
                    $_FILES['file']['name'] = $_FILES[$archivos]['name'][$i];
                    $_FILES['file']['type'] = $_FILES[$archivos]['type'][$i];
                    $_FILES['file']['tmp_name'] = $_FILES[$archivos]['tmp_name'][$i];
                    $_FILES['file']['error'] = $_FILES[$archivos]['error'][$i];
                    $_FILES['file']['size'] = $_FILES[$archivos]['size'][$i];

                    // Configuración para el archivo a subir
                    $config['upload_path'] = $carpeta . '/';
                    $config['allowed_types'] = "pdf";
                    //50001
                    $config['max_size'] = "50001 KB";
                    $config['encrypt_name'] = true;

                    // Obteniendo la instancia de Codeigniter
                    // Para poder acceder a la propiedad upload
                    $CI =& get_instance();
                    $CI->load->library('upload', $config);

                    $respuesta;

                    if(!$CI->upload->do_upload("file")) 
                    {
                        $error = array('error' => $CI->upload->display_errors());

                        $respuesta["mensaje"] = $error["error"];
                        $respuesta["error"] = true;
                    }

                    else
                    {
                        // Si ya existe se elimina el archivo
                        if(file_exists($rutaArchivoActual))
                        {
                            unlink($rutaArchivoActual);    
                        }
                    }
                    
                    return $respuesta;
                }
            }
        }
    }