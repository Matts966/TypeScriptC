#include <tk/tkernel.h>
#include <tm/tmonitor.h>
#include <libstr.h>

typedef enum { TASK_A, OBJ_KIND_NUM } OBJ_KIND;
EXPORT ID ObjID[OBJ_KIND_NUM];

EXPORT void task_a(INT stacd, VP exinf);
EXPORT void task_a(INT stacd, VP exinf) {
	int i;
	for ( i = 0; i < 3; i++ ) {
		tm_putstring("output!");
	}
	tk_ext_tsk();
}

EXPORT INT usermain( void ) {
	T_CTSK t_ctsk;
	ID objid;
	t_ctsk.tskatr = TA_HLNG | TA_DSNAME;

	t_ctsk.stksz = 1024;
	t_ctsk.itskpri = 1;
	STRCPY( (char *)t_ctsk.dsname, "task_a");
	t_ctsk.task = task_a;
	if ( (objid = tk_cre_tsk( &t_ctsk )) <= E_OK ) {
		tm_putstring(" *** Failed in the creation of task_a.\n");
		return 1;
	}
	ObjID[TASK_A] = objid;
	while(1) {
		tk_sta_tsk( ObjID[TASK_A], 0 );
	}
}
