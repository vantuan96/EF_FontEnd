/* ============
 * Vietnam Language File
 * ============
 *
 * An example language file.
 */
import general from './general.json'
import auth from './auth.json'
import home from './home.json'
import customer from './customer.json'
import ETR from './ETR.json'
import ER0 from './ER0.json'
import OS0 from './OS0.json'
import btn from './btn.json'
import DI0 from './DI0.json'
import PHR from './PHR.json'
import PHC from './PHC.json'
import drs from './drs.json'
import text from './text.json'
import InitialAssessment from './InitialAssessment.json'
import listAction from './listAction.json'
export default {
  auth,
  general,
  home,
  customer,
  OS0,
  ETR,
  ER0,
  btn,
  DI0,
  PHR,
  PHC,
  InitialAssessment,
  listAction,
  ...text,
  ...drs
}
