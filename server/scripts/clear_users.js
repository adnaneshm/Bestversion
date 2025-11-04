(async function(){
  try{
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceRole = process.env.SUPABASE_SERVICE_ROLE;
    if(!supabaseUrl || !serviceRole){
      console.error('Supabase config missing in env. Aborting.');
      process.exit(1);
    }

    const tables = ['user_categories','tutors','app_users','users'];
    // Try to delete rows from each table. Use service role key.
    for(const table of tables){
      const url = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/${table}`;
      try{
        const resp = await fetch(url, {
          method: 'DELETE',
          headers: {
            'apikey': serviceRole,
            'Authorization': `Bearer ${serviceRole}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          }
        });
        if(resp.ok){
          console.log(`Cleared table: ${table}`);
        } else {
          const txt = await resp.text().catch(()=>'');
          console.warn(`Failed to clear ${table}:`, resp.status, txt);
        }
      }catch(err){
        console.warn(`Error clearing ${table}:`, err?.message || err);
      }
    }

    console.log('Done.');
    process.exit(0);
  }catch(err){
    console.error('Unexpected error', err);
    process.exit(2);
  }
})();
