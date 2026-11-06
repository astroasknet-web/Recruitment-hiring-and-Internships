-- A listing is either an internship (stipend per month, fixed number of weeks) or a job (salary per month, no end date).
ALTER TABLE internships ADD COLUMN kind VARCHAR(20) NOT NULL DEFAULT 'internship';
