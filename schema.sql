create table libraries (
id serial primary key,
state varchar(10),
state_name varchar (20),
library_id varchar,
library_name varchar,
street_address varchar,
city varchar,
lon float,
lat float,
services_population float,
hours float,
visits float,
registered_users float,
circulation_transactions float,
bookmobiles float,
mls_librarians float,
librarians float,
employees float,
total_staff float,
salaries float,
benefits float,
total_staff_expenditures float,
local_govt_operating_revenue float,
state_govt_operating_revenue float,
federal_govt_operating_revenue float,
other_operating_revenue float,
total_operating_revenue float,
print_collections_expenditures float,
digital_collections_expenditures float,
other_collection_expenditures float,
total_collection_expenditures float,
other_operating_expenditures float,
total_operating_expenditures float,
print_collection float,
digital_collection float,
audio_collection float,
downloadable_audio float,
physical_video float,
downloadable_video float
);

select * from libraries;

select * from libraries 
where lon=0;

select * from libraries 
where lat=0;

select * from libraries 
where state='MN';

drop table libraries;



