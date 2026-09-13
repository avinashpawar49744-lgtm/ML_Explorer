insert into public.practicals (practical_number, title, description, category, difficulty, duration_minutes)
values
(1, 'Implement and compare Supervised, Unsupervised, and Semi-Supervised datasets with visualization using Python.', 'Compare labeled, unlabeled, and partially labeled learning settings.', 'Machine Learning Fundamentals', 'Easy', 45),
(2, 'Implement the Candidate Elimination Algorithm and visualize the Version Space boundaries.', 'Track specific and general hypothesis boundaries.', 'Concept Learning', 'Medium', 50),
(3, 'Implement a supervised machine learning model on a real dataset; demonstrate model selection, performance measurement, and interpretation.', 'Train and interpret a supervised model.', 'Supervised Learning', 'Medium', 60),
(4, 'Build a Regression Model (Linear Regression / Polynomial Regression) and analyze prediction error using MAE, MSE, RMSE.', 'Fit curves and compare prediction errors.', 'Regression', 'Medium', 55),
(5, 'Implement K-Nearest Neighbors Classification with multiple K values and compare performance metrics.', 'Explore distance-based classification.', 'Classification', 'Medium', 50),
(6, 'Compute VC Dimension and Sample Complexity for basic hypothesis classes (line, interval, circle).', 'Connect model capacity with sample complexity.', 'Learning Theory', 'Easy', 40),
(7, 'Implement a Radial Basis Function (RBF) Network using Gaussian radial kernels.', 'Visualize local Gaussian activations.', 'Neural Networks', 'Advanced', 65),
(8, 'Implement Single-Layer Perceptron Learning & Linear Threshold Neuron from scratch.', 'Train a linear threshold classifier.', 'Neural Networks', 'Medium', 50),
(9, 'Implement a Multi-Layer Perceptron (MLP) trained with Backpropagation using Python.', 'Follow forward and backward propagation.', 'Deep Learning', 'Advanced', 75),
(10, 'Develop a Mini-Application integrating core ML steps: data preprocessing -> model training -> visualization -> evaluation.', 'Run a complete ML workflow.', 'Machine Learning Application', 'Advanced', 80)
on conflict (practical_number) do update set title = excluded.title, description = excluded.description, category = excluded.category, difficulty = excluded.difficulty, duration_minutes = excluded.duration_minutes;

insert into public.laboratory_settings (lab_name, department, batch, description)
select 'ML Explorer', 'Artificial Intelligence & Machine Learning', 'B2', 'Learn, implement, and visualize machine learning concepts.'
where not exists (select 1 from public.laboratory_settings);

-- Auth users must be created through Supabase Auth first. After those accounts exist,
-- run the following inserts using the matching auth.users records to seed profiles.
insert into public.profiles (id, full_name, email, role, department, batch, bio)
select u.id, 'Avinash Pawar', u.email, 'student', 'Artificial Intelligence & Machine Learning', 'B2', 'Student'
from auth.users u where lower(u.email) = lower('avinas hpawar49744@gmail.com')
on conflict (id) do update set full_name = excluded.full_name, role = excluded.role, department = excluded.department, batch = excluded.batch;

insert into public.student_social_links (user_id, instagram, linkedin, github, email)
select p.id, '@er.avii_pawar_', 'pawaravinashh', 'Avinashpawar497444-lgtm', 'avinas hpawar49744@gmail.com'
from public.profiles p where lower(p.email) = lower('avinas hpawar49744@gmail.com') and p.role = 'student'
on conflict (user_id) do update set instagram = excluded.instagram, linkedin = excluded.linkedin, github = excluded.github, email = excluded.email;

-- Create faculty accounts in Authentication, then update their profiles to faculty role.
insert into public.profiles (id, full_name, email, role, department, bio)
select u.id, 'Prof. Suraj Mahajan', u.email, 'faculty', 'Artificial Intelligence & Machine Learning', 'Head of Department (HOD)'
from auth.users u where lower(u.raw_user_meta_data ->> 'full_name') = lower('Prof. Suraj Mahajan')
on conflict (id) do update set full_name = excluded.full_name, role = excluded.role, department = excluded.department, bio = excluded.bio;

insert into public.profiles (id, full_name, email, role, department, bio)
select u.id, 'Prof. Pranay Dongarwar', u.email, 'faculty', 'Artificial Intelligence & Machine Learning', 'Course Coordinator'
from auth.users u where lower(u.raw_user_meta_data ->> 'full_name') = lower('Prof. Pranay Dongarwar')
on conflict (id) do update set full_name = excluded.full_name, role = excluded.role, department = excluded.department, bio = excluded.bio;
