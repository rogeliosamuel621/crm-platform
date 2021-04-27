import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination
} from '@windmill/react-ui';
import { EditIcon, TrashIcon, ViewIcon } from '../../icons';
import PageTitle from '../../components/Typography/PageTitle';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomersAction } from '../../redux/actions/CustomersActions';

const CustomersList = () => {
  const dispatch = useDispatch();
  const { customers } = useSelector(state => state.customers);

  useEffect(() => {
    dispatch(getCustomersAction());
  }, []);

  return (
    <>
      <PageTitle>Customers</PageTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {customers.map((customer, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    {/* <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User avatar" /> */}
                    <div>
                      <p className="font-semibold">{customer.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {customer.position}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{customer.email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{customer.company}</span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete">
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          {/* <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable2}
            label="Table navigation"
          /> */}
        </TableFooter>
      </TableContainer>
    </>
  );
};

export default CustomersList;
