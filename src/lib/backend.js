import { supabase } from './supabase';

function unavailable() {
  return { data: null, error: new Error('Supabase is not configured.') };
}

export async function getPracticals() {
  if (!supabase) return unavailable();
  return supabase.from('practicals').select('*').eq('is_active', true).order('practical_number');
}

export async function getDashboardStats(userId) {
  if (!supabase || !userId) return unavailable();
  const [practicals, students, faculty, experiments, progress, submissions, datasets] = await Promise.all([
    supabase.from('practicals').select('id', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'student'),
    supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'faculty'),
    supabase.from('experiment_sessions').select('id', { count: 'exact', head: true }),
    supabase.from('student_progress').select('id', { count: 'exact', head: true }).eq('status', 'completed'),
    supabase.from('practical_submissions').select('id', { count: 'exact', head: true }).eq('status', 'submitted'),
    supabase.from('datasets').select('id', { count: 'exact', head: true }).eq('is_public', true),
  ]);
  const error = [practicals, students, faculty, experiments, progress, submissions, datasets].find((result) => result.error)?.error;
  return { data: { practicals: practicals.count || 0, students: students.count || 0, faculty: faculty.count || 0, completed: progress.count || 0, experiments: experiments.count || 0, submissions: submissions.count || 0, datasets: datasets.count || 0 }, error };
}

export async function saveExperiment({ userId, practicalId, datasetId, parameters, metrics, prediction, visualizationData, summary, status = 'completed' }) {
  if (!supabase) return unavailable();
  const session = await supabase.from('experiment_sessions').insert({ user_id: userId, practical_id: practicalId, dataset_id: datasetId || null, parameters, status, completed_at: status === 'completed' ? new Date().toISOString() : null }).select().single();
  if (session.error) return session;
  const result = await supabase.from('experiment_results').insert({ session_id: session.data.id, user_id: userId, practical_id: practicalId, parameters, metrics, prediction, visualization_data: visualizationData, result_summary: summary }).select().single();
  if (result.error) return result;
  await supabase.from('activity_logs').insert({ user_id: userId, activity_type: 'EXPERIMENT_RUN', description: summary || 'Experiment completed', metadata: { practical_id: practicalId, session_id: session.data.id } });
  return { data: { session: session.data, result: result.data }, error: null };
}

export async function getExperimentHistory(userId) {
  if (!supabase || !userId) return unavailable();
  return supabase.from('experiment_sessions').select('*, practicals(title, practical_number), experiment_results(*)').eq('user_id', userId).order('created_at', { ascending: false });
}

export async function getSubmissions(userId) {
  if (!supabase || !userId) return unavailable();
  return supabase.from('practical_submissions').select('*, practicals(title, practical_number)').eq('student_id', userId).order('submitted_at', { ascending: false });
}
