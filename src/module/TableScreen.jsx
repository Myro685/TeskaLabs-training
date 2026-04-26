import React from "react";
import { Container } from "reactstrap";
import { useTranslation } from "react-i18next";
import { DataTableCard2 } from "asab_webui_components";

export function TableScreen(props) {
  const { t } = useTranslation();

  const tableLoader = async ({ params, setRows, setCount }) => {
    try {
      const response = await fetch("https://devtest.teskalabs.com/data");

      if (!response.ok) {
        throw new Error(`HTTP chyba! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Data: ", result);

      return {
        count: result.total,
        rows: result.data,
      };
    } catch (error) {
      console.error(error);
      return { count: 0, rows: [] };
    }
  };

  const columns = [
    { title: "ID", render: ({ row }) => row.id },
    { title: "Username", render: ({ row }) => row.username },
    { title: "Email", render: ({ row }) => row.email },
    { title: "Address", render: ({ row }) => row.address },
    { title: "Created", render: ({ row }) => row.created },
    { title: "Last Sign In", render: ({ row }) => row.last_sign_in },
  ];

  return (
    <Container className="h-100">
      <DataTableCard2
        columns={columns}
        loader={tableLoader}
        header={<div>{t("Training|Users")}</div>}
      />
    </Container>
  );
}
