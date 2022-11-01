CREATE or REPLACE view view_psicologia as
select primer_registro.idregistro AS idregistro,
primer_registro.nombre AS nombre,
entrevista.hora AS hora,
entrevista.fecha AS fecha,
entrevista.estatus AS estatus,
entrevista.area AS area,
asesoria.tipo_asesoria AS tipo_asesoria
from primer_registro 
join entrevista on entrevista.idregistro = primer_registro.idregistro
join asesoria on asesoria.idregistro = primer_registro.idregistro
where asesoria.tipo_asesoria = 1 or  asesoria.tipo_asesoria = 3