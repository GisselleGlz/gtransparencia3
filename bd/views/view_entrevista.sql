CREATE or REPLACE view view_entrevista as
select primer_registro.idregistro AS idregistro,
primer_registro.nombre AS nombre,
entrevista.hora AS hora,
entrevista.fecha AS fecha,
entrevista.estatus AS estatus,
entrevista.area AS area
from primer_registro join entrevista on entrevista.idregistro = primer_registro.idregistro