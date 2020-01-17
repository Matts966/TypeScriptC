#include <tk/tkernel.h>
#include <tm/tmonitor.h>
#include <libstr.h>

typedef enum { TASK_A, MBUF_TASK_A, TASK_B, MBUF_TASK_B, OBJ_KIND_NUM } OBJ_KIND;
EXPORT ID ObjID[OBJ_KIND_NUM];

UB __task_a_buffer;
EXPORT void task_a(INT stacd, VP exinf);
EXPORT void task_a(INT stacd, VP exinf) {
	while ( 1 ) {
		tm_putstring((UB*)"Push any key to say hello to task_b ");
		tm_getchar(-1);
		tm_putstring("\n");
		tk_snd_mbf( ObjID[MBUF_TASK_B], &__task_a_buffer, sizeof __task_a_buffer, TMO_FEVR );
		tk_rcv_mbf( ObjID[MBUF_TASK_A], &__task_a_buffer, TMO_FEVR );
		tm_putstring(" *** task_a message received!\n");
	}
	tk_ext_tsk();
}

UB __task_b_buffer;
EXPORT void task_b(INT stacd, VP exinf);
EXPORT void task_b(INT stacd, VP exinf) {
	while ( 1 ) {
		tk_rcv_mbf( ObjID[MBUF_TASK_B], &__task_b_buffer, TMO_FEVR );
		tm_putstring(" *** task_b message received!\n");
		tm_putstring((UB*)"Push any key to say hello to task_a ");
		tm_getchar(-1);
		tm_putstring("\n");
		tk_snd_mbf( ObjID[MBUF_TASK_A], &__task_b_buffer, sizeof __task_b_buffer, TMO_FEVR );
	}
	tk_ext_tsk();
}

EXPORT INT usermain( void ) {
	T_CMBF cmbf = { NULL, TA_TFIFO, 256, 5 };
	T_CTSK t_ctsk;
	ID objid;
	t_ctsk.tskatr = TA_HLNG | TA_DSNAME;

	t_ctsk.itskpri = 5;
	t_ctsk.stksz = 1024;
	STRCPY( (char *)t_ctsk.dsname, "task_a");
	t_ctsk.task = task_a;
	if ( (objid = tk_cre_tsk( &t_ctsk )) <= E_OK ) {
		tm_putstring(" *** Failed in the creation of task_a.\n");
		return 1;
	}
	ObjID[TASK_A] = objid;
	cmbf.maxmsz = 5;
	if ( (objid = tk_cre_mbf( &cmbf )) <= E_OK ) {
		tm_putstring(" *** Failed in the creation of messsage box oftask_a.\n");
		return 1;
	}
	ObjID[MBUF_TASK_A] = objid;
	tm_putstring("*** task_a created.\n");
	t_ctsk.itskpri = 5;
	t_ctsk.stksz = 1024;
	STRCPY( (char *)t_ctsk.dsname, "task_b");
	t_ctsk.task = task_b;
	if ( (objid = tk_cre_tsk( &t_ctsk )) <= E_OK ) {
		tm_putstring(" *** Failed in the creation of task_b.\n");
		return 1;
	}
	ObjID[TASK_B] = objid;
	cmbf.maxmsz = 5;
	if ( (objid = tk_cre_mbf( &cmbf )) <= E_OK ) {
		tm_putstring(" *** Failed in the creation of messsage box oftask_b.\n");
		return 1;
	}
	ObjID[MBUF_TASK_B] = objid;
	tm_putstring("*** task_b created.\n");
	if ( tk_sta_tsk( ObjID[TASK_A], 0 ) != E_OK ) {
		tm_putstring(" *** Failed in start of task_a.\n");
		return 1;
	}
	if ( tk_sta_tsk( ObjID[TASK_B], 0 ) != E_OK ) {
		tm_putstring(" *** Failed in start of task_b.\n");
		return 1;
	}
}
