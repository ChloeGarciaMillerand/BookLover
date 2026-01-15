select
    proname,
    oidvectortypes(proargtypes) as args
from pg_proc
where proname = 'create_book';
