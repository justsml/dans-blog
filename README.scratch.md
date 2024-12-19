
# Misc Commands for Data Processing

```bash
# https://blog.rtwilson.com/how-to-speed-up-appending-to-postgis-tables-with-ogr2ogr/

psql -c 'create schema fema_data;'

# CREATE TABLE us_structures
ogr2ogr -nln us_structures \
  -gt 200000 \
  -makevalid \
  -resolveDomains \
  -nlt PROMOTE_TO_MULTI \
  -lco SPATIAL_INDEX=SPGIST \
  -lco GEOMETRY_NAME=geom \
  -lco FID=id \
  -lco SCHEMA=fema_data \
  --config PG_USE_COPY YES \
  -f "PostgreSQL" PG:"host=127.0.0.1 port=5433 user=postgres dbname=postgres password=postgres" \
  Deliverable20230526HI/HI_Structures.gdb


ogr2ogr -nln us_structures -append -update --config PG_USE_COPY YES -f "PostgreSQL" PG:"host=192.168.0.78 port=5433 user=postgres dbname=postgres password=postgres" Deliverable20230630CO/CO_Structures.gdb -nlt PROMOTE_TO_MULTI -lco SPATIAL_INDEX=NONE -lco GEOMETRY_NAME=geom -lco FID=id -lco SCHEMA=public
ogr2ogr -nln us_structures -append -update --config PG_USE_COPY YES -f "PostgreSQL" PG:"host=192.168.0.78 port=5433 user=postgres dbname=postgres password=postgres" Deliverable20230526AL/AL_Structures.gdb -nlt PROMOTE_TO_MULTI
ogr2ogr -nln us_structures -append -update --config PG_USE_COPY YES -f "PostgreSQL" PG:"host=192.168.0.78 port=5433 user=postgres dbname=postgres password=postgres" Deliverable20230630AR/AR_Structures.gdb -nlt PROMOTE_TO_MULTI
ogr2ogr -nln us_structures -append -update --config PG_USE_COPY YES -f "PostgreSQL" PG:"host=192.168.0.78 port=5433 user=postgres dbname=postgres password=postgres" Deliverable20230630TX/TX_Structures.gdb -nlt PROMOTE_TO_MULTI

function import_gdb () {
    ogr2ogr -nln us_structures -append -update --config PG_USE_COPY YES -f "PostgreSQL" PG:"host=127.0.0.1 port=5433 user=postgres dbname=postgres password=postgres" "$@" -nlt PROMOTE_TO_MULTI \
    && echo "✅ Imported $1" \
    || echo "❌ Failed to import $1"
}

ogr2ogr -nln us_structures -append -update --config PG_USE_COPY YES -f "PostgreSQL" PG:"host=192.168.0.78 port=5433 user=postgres dbname=postgres password=postgres" Deliverable20230728AK/AK_Structures.gdb -nlt PROMOTE_TO_MULTI

# Done

# In progress
unzip Deliverable20231003OK.zip
import_gdb Deliverable20231003OK/OK_Structures.gdb &

import_gdb Deliverable20230526OR/OR_Structures.gdb &
import_gdb Deliverable20230630PR/PR_Structures.gdb &
import_gdb Deliverable20230502RI/RI_Structures.gdb &
import_gdb Deliverable20230831PA/PA_Structures.gdb &

# ; SQL Error [22023]: ERROR: Geometry type (GeometryCollection) does not match column type (MultiPolygon)
```
