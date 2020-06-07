import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import model from "../models";
import { performGetSupportTicket } from "../actions";
import { selectSupportTicket } from "../reducers";

import SupportTicketForm from "../components/SupportTicketForm";
import FormWrapper from "../../shared/containers/FormWrapper";
import DateDisplay from "../../shared/components/Data/DateDisplay";
import SupportTicketStatusDisplay from "../../shared/components/Data/SupportTicketStatusDisplay";
import request from "../../../utils/request.util";
import { templates } from "../../../styles/stylings/stylings.style";
import { colors } from "../../../styles/variables/colors.style";

const EditSupportTicketCtn = ({ subjectId }) => {
  const dispatch = useDispatch();

  const formFuncs = useForm();
  const fetchedSupportTicket = useSelector(selectSupportTicket.supportTicket);
  const isSuccessSupportTicket = useSelector(selectSupportTicket.isSuccessSupportTicket);
  const isLoadingSupportTicket = useSelector(selectSupportTicket.isLoadingSupportTicket);

  const [newModel, setNewModel] = useState(null);
  const [errRes, setErrRes] = useState(null);

  const mapFetchedToFormModel = (_model, supportTicket) => {
    const nModel = JSON.parse(JSON.stringify(_model)); // HAS TO BE DEEP COPY
    // Assigning references to reduxSelectors, custom dataType function
    ["statusId"].forEach(f => {
      nModel.find(field => field.name === f).selections = _model.find(
        field => field.name === f
      ).selections;
      // dataTypes[0] must be dataTypes.CUSTOM
      nModel.find(field => field.name === f).dataTypes[0].options = _model.find(
        field => field.name === f
      ).dataTypes[0].options;
    });
    nModel.forEach(field => {
      switch (field.name) {
        case "id":
        case "statusId": {
          field.defaultValue = supportTicket[field.name];
          break;
        }
        default: {
          break;
        }
      }
    });
    return nModel;
  };

  useEffect(() => {
    dispatch(performGetSupportTicket(subjectId));

    return () => {
      model.forEach(field => {
        formFuncs.unregister(field.name);
      });
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    setNewModel(null);
    // model with new defaultValue
    if (!isLoadingSupportTicket && isSuccessSupportTicket) {
      const nModel = mapFetchedToFormModel(model, fetchedSupportTicket);
      setNewModel(nModel);
    }
  }, [fetchedSupportTicket, isLoadingSupportTicket]); // eslint-disable-line

  const handleOnSubmit = async data => {
    const { id, statusId } = data;
    setErrRes(null);
    try {
      const result = await request("patch", `/support/${id}/status`, { statusId });
      setErrRes(result);
      dispatch(performGetSupportTicket(subjectId));
    } catch (e) {
      setErrRes(e.response);
    }
  };

  return (
    <>
      {newModel && (
        <>
          <SupportTicketFormWrapper
            formFuncs={formFuncs}
            submitted={handleOnSubmit}
            errRes={errRes}
          >
            <SupportTicketForm model={newModel} isPerformingUpdate />
            <div>
              <h3>Customer Info</h3>
              <table>
                <tbody>
                  <tr>
                    <td>Name: </td>
                    <td>{`${fetchedSupportTicket.Customer.Info.lastName} ${fetchedSupportTicket.Customer.Info.firstName}`}</td>
                  </tr>
                  <tr>
                    <td>Username: </td>
                    <td>{fetchedSupportTicket.Customer.Account.username}</td>
                  </tr>
                  <tr>
                    <td>Email: </td>
                    <td>
                      <b>{fetchedSupportTicket.Customer.Account.email}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Phone number: </td>
                    <td>{fetchedSupportTicket.Customer.Info.phone}</td>
                  </tr>
                  <tr>
                    <td>Address: </td>
                    <td>{fetchedSupportTicket.Customer.Info.address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h3>Details</h3>
              <table>
                <tbody>
                  <tr>
                    <td>Support Type: </td>
                    <td>{fetchedSupportTicket.SupportType.name}</td>
                  </tr>
                  <tr>
                    <td>Status: </td>
                    <td>
                      <SupportTicketStatusDisplay status={fetchedSupportTicket.Status} />
                    </td>
                  </tr>
                  <tr>
                    <td>Supporting Staff: </td>
                    <td>
                      {fetchedSupportTicket.Support ? (
                        fetchedSupportTicket.Support.Account.username
                      ) : (
                        <span style={{ color: colors.scheme.warning.dark }}>Pending...</span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Attached Order ID: </td>
                    <td>{fetchedSupportTicket.orderId || "None"}</td>
                  </tr>
                  <tr>
                    <td>Created at: </td>
                    <td>
                      <DateDisplay value={fetchedSupportTicket.createdAt} />
                    </td>
                  </tr>
                  <tr>
                    <td>Updated at: </td>
                    <td>
                      <DateDisplay value={fetchedSupportTicket.updatedAt} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h3>Note from Customer</h3>
              <NoteDisplay>{fetchedSupportTicket.note}</NoteDisplay>
            </div>
          </SupportTicketFormWrapper>
        </>
      )}
    </>
  );
};

export default EditSupportTicketCtn;

// PropTypes
EditSupportTicketCtn.propTypes = {
  subjectId: PropTypes.string.isRequired
};

// Styles
const SupportTicketFormWrapper = styled(FormWrapper)`
  ${templates.FORM.BASIC}

  & > .clear {
    margin-top: 1rem !important;
  }
`;

const NoteDisplay = styled.div`
  margin-top: 1rem;
  border: thin solid ${colors.gray.light};
  padding: 1rem;
  border-radius: 0.25em;
`;
