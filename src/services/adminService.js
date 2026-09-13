import { supabase } from '../lib/supabase';

const missing = () => ({ data: null, error: new Error('Supabase is not configured.') });
const table = (name, columns = '*') => supabase ? supabase.from(name).select(columns) : missing();

export const adminService = {
  getDashboardStats: (userId) => import('../lib/backend').then(({ getDashboardStats }) => getDashboardStats(userId)),
  getStudents: () => table('profiles').eq('role', 'student').order('created_at', { ascending: false }),
  getFaculty: () => table('profiles').eq('role', 'faculty').order('created_at', { ascending: false }),
  getTeamMembers: () => table('laboratory_members').order('display_order'),
  getPracticals: () => table('practicals').order('practical_number'),
  getDatasets: () => table('datasets').order('created_at', { ascending: false }),
  getExperiments: () => table('experiment_sessions').order('created_at', { ascending: false }),
  getSubmissions: () => table('practical_submissions').order('submitted_at', { ascending: false }),
  getActivityLogs: () => table('activity_logs').order('created_at', { ascending: false }),
  getSettings: () => table('app_settings').order('key'),
  createPractical: (payload) => supabase ? supabase.from('practicals').insert(payload).select().single() : missing(),
  updatePractical: (id, payload) => supabase ? supabase.from('practicals').update(payload).eq('id', id).select().single() : missing(),
  deletePractical: (id) => supabase ? supabase.from('practicals').delete().eq('id', id) : missing(),
  updateSettings: (key, value, updatedBy) => supabase ? supabase.from('app_settings').upsert({ key, value, updated_by: updatedBy }).select().single() : missing(),
  evaluateSubmission: (id, payload) => supabase ? supabase.from('practical_submissions').update({ ...payload, evaluated_at: new Date().toISOString() }).eq('id', id).select().single() : missing(),
};
