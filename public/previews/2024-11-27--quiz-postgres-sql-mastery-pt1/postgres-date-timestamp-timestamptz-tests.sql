DROP TABLE public.timestamp_demo ;
CREATE table if not EXISTS public.timestamp_demo (
    ts TIMESTAMP,
    tstz TIMESTAMPTZ,
    current_timezone TEXT,
    label TEXT
);


SET timezone = 'America/Denver';
-- TEST #1: Server+Input Strings have TZ=-6, check for differences
INSERT INTO public.timestamp_demo (label, ts, tstz, current_timezone)
values
  ('TZ:-6, Input TZ: -6, NYE', '2025-01-01 00:00:00-06','2025-01-01 00:00:00-06', current_setting('timezone')),
  ('TZ:-6, Input TZ: -6, NYD', '2025-01-01 23:59:59-06','2025-01-01 23:59:59-06', current_setting('timezone')),
-- TEST #2: Server TZ=-6, Input TZ=null, check for differences
  ('TZ:-6, Input TZ: null, NYE', '2025-01-01 00:00:00','2025-01-01 00:00:00', current_setting('timezone')),
  ('TZ:-6, Input TZ: null, NYD', '2025-01-01 23:59:59','2025-01-01 23:59:59', current_setting('timezone')),
-- TEST #3: Server TZ=-6, Input TZ=-0, check for differences
  ('TZ:-6, Input TZ: -0, NYE', '2025-01-01 00:00:00-0','2025-01-01 00:00:00-0', current_setting('timezone')),
  ('TZ:-6, Input TZ: -0, NYD', '2025-01-01 23:59:59-0','2025-01-01 23:59:59-0', current_setting('timezone'));

/**
NOW, what if the server/connection is set to UTC?
- Does it change the way the INSERTS above are parsed?
- Does it change the way the SELECTS below are displayed?
**/

SET timezone = 'UTC';
INSERT INTO public.timestamp_demo (label, ts, tstz, current_timezone)
values
  ('TZ:UTC, Input TZ: -6, NYE', '2025-01-01 00:00:00-06','2025-01-01 00:00:00-06', current_setting('timezone')),
  ('TZ:UTC, Input TZ: -6, NYD', '2025-01-01 23:59:59-06','2025-01-01 23:59:59-06', current_setting('timezone')),
-- TEST #2: Server TZ=-6, Input TZ=null, check for differences
  ('TZ:UTC, Input TZ: null, NYD', '2025-01-01 23:59:59','2025-01-01 23:59:59', current_setting('timezone')),
  ('TZ:UTC, Input TZ: null, NYE', '2025-01-01 00:00:00','2025-01-01 00:00:00', current_setting('timezone')),
-- TEST #3: Server TZ=-6, Input TZ=0, check for differences
  ('TZ:UTC, Input TZ: 0, NYD', '2025-01-01 23:59:59-0','2025-01-01 23:59:59-0', current_setting('timezone')),
  ('TZ:UTC, Input TZ: 0, NYE', '2025-01-01 00:00:00-0','2025-01-01 00:00:00-0', current_setting('timezone'));


/**
NOW, what if the server/connection changes to Sydney (+11) time?
- Does it change the way the INSERTS above are parsed?
- Does it change the way the SELECTS below are displayed?
**/

SET timezone = 'Australia/Sydney'; -- TZ=+11
INSERT INTO public.timestamp_demo (label, ts, tstz, current_timezone)
values
  ('TZ:+11, Input TZ: -6, NYE', '2025-01-01 00:00:00-06','2025-01-01 00:00:00-06', current_setting('timezone')),
  ('TZ:+11, Input TZ: -6, NYD', '2025-01-01 23:59:59-06','2025-01-01 23:59:59-06', current_setting('timezone')),
-- TEST #2: Server TZ=-6, Input TZ=null, check for differences
  ('TZ:+11, Input TZ: null, NYD', '2025-01-01 23:59:59','2025-01-01 23:59:59', current_setting('timezone')),
  ('TZ:+11, Input TZ: null, NYE', '2025-01-01 00:00:00','2025-01-01 00:00:00', current_setting('timezone')),
-- TEST #3: Server TZ=-6, Input TZ=0, check for differences
  ('TZ:+11, Input TZ: 0, NYD', '2025-01-01 23:59:59-0','2025-01-01 23:59:59-0', current_setting('timezone')),
  ('TZ:+11, Input TZ: 0, NYE', '2025-01-01 00:00:00-0','2025-01-01 00:00:00-0', current_setting('timezone'));


/*****
Expected Results:
- The server's timezone setting should not affect the way the input strings are parsed.
- The server's timezone setting should affect the way the output strings are displayed.
- The input strings should be parsed as if they are in the timezone specified in the string.
- The output strings should be displayed in the timezone specified by the server's timezone setting.

One way to think of timestamps versus date strings:
- The name `timestamp` hints it's a mere integer.
  - Timestamps are nothing more than the number of seconds since the Unix epoch (1970-01-01 00:00:00 UTC).
  - Therefor, they are always stored in UTC.
- Date strings can plainly include a timezone! Any timezone! In a highly readable format!*

Both `timestamp`/`timestamptz` use the **exact** same 8 byte bigint data type.
The reason they cannot is because they are always stored in UTC.
They are always stored in UTC. They are a number of seconds since the Unix epoch.
- Saving original date strings to capture original Timezone information. mix them different a column, 
-- And _persist_ that timezone. (When printing a airline or concert ticket, you want the time to be in the timezone of the event.)
- A timestamp is a bigint - which in PG is always 8-bytes.
based on the number of seconds since the Unix epoch (1970-01-01 00:00:00 UTC).
******/

SET timezone = 'America/Denver';
-- RAISE NOTICE 'Current Timezone: %', current_setting('timezone');
SELECT
  ts,
  current_timezone,
  timezone(current_timezone, tstz) as current_adj_tz,
  timezone('UTC', tstz) as utc_adj_tz,
  tstz,
  label
FROM public.timestamp_demo order by ts, label;

SET timezone = 'UTC';
-- RAISE NOTICE 'Current Timezone: %', current_setting('timezone');
SELECT * FROM public.timestamp_demo;
