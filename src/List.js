import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from '@material-ui/core';

function List({
  brandList,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  classes
}) {
  return (
          <div className={classes.table}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Picture</b></TableCell>
                  <TableCell><b>ID</b></TableCell>
                  <TableCell><b>Brand</b></TableCell>
                  <TableCell><b>Styles</b></TableCell>
                  <TableCell><b>ABV</b></TableCell>
                  <TableCell><b>IBU</b></TableCell>
                  <TableCell><b>Ounces</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {brandList.length > 0 &&
                  brandList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                    ({ id, name, style, abv, ibu, ounces,image }, index) => {
                      return (
                        <TableRow key={id}>
                          <TableCell>
                            <img
                              src={image}
                              width="50"
                              height="50"
                              alt="picture"
                            />
                          </TableCell>
                          <TableCell>{id}</TableCell>
                          <TableCell>{name}</TableCell>
                          <TableCell>{style}</TableCell>
                          <TableCell>{abv}</TableCell>
                          <TableCell>{ibu}</TableCell>
                          <TableCell>{ounces}</TableCell>
                        </TableRow>
                      );
                    }
                  )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={brandList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </div>

  );
}

export default List;
