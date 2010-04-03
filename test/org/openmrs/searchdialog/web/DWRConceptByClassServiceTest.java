package org.openmrs.searchdialog.web;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Before;
import org.junit.Test;
import org.openmrs.api.context.Context;
import org.openmrs.jquerysearchdialog.web.DWRConceptByClassService;
import org.openmrs.test.BaseModuleContextSensitiveTest;
import org.openmrs.test.Verifies;

public class DWRConceptByClassServiceTest  extends BaseModuleContextSensitiveTest{
	
	private Log log = LogFactory.getLog(getClass());
	
	/**
	 * @see org.openmrs.test.BaseContextSensitiveTest#useInMemoryDatabase()
	 */
	@Override
	public Boolean useInMemoryDatabase() {
	    return false;
	}
	
	@Before	public void  setup(){
		Context.authenticate("admin", "admin");
	
	}
	
	/**
	 * @see {@link DWRConceptByClassService#FindConceptsByClass(String,String,null)}
	 * 
	 */
	@Test
	@Verifies(value = "should return a valid lists", method = "FindConceptsByClass(String,String,null)")
	public void FindConceptsByClass_shouldReturnAValidLists() throws Exception {
		DWRConceptByClassService service = new DWRConceptByClassService();
		System.out.println(service.FindConceptsByClass("A", "Specimehn", false));
	}
}