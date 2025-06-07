
'use server';

import type { Project } from '@/types';
// Unused imports and schema removed as the admin UI is no longer present.
// If you re-introduce an admin form, relevant logic would need to be restored.

export async function addProjectAction(prevState: any, formData: FormData) {
  // This function is no longer called by any active UI.
  // If re-enabled, ensure proper validation and error handling.
  // For now, it's a no-op to prevent errors if somehow triggered.
  console.warn("addProjectAction called, but admin UI is disabled.");
  return {
    message: 'Admin functionality is currently disabled.',
    type: 'error',
    errors: null,
    resetKey: prevState?.resetKey || Date.now().toString(),
  };
}
