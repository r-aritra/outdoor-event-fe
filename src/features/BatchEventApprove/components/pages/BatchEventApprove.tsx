/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { Paper, TextInput, Button, Text, Table } from '@mantine/core';
import { z } from 'zod';
import { useLocation } from 'react-router-dom';

// Define the schema for form validation
const schema = z.object({
  date: z.string().refine((date) => !!date, { message: 'Date is required' }),
  venue: z.string().refine((venue) => !!venue, { message: 'Venue is required' }),
  name: z.string().refine((name) => !!name, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email format' }),
  number: z
    .string()
    .refine((phoneNumber) => !!phoneNumber, { message: 'Phone Number is required' }),
});

const BatchEventApprove = () => {
  // Initialize the form with provided data

  const location = useLocation();
  const { state } = location;
  const [json, setJson] = useState(state?.data);

  useEffect(() => {
    setJson(state?.data);
    console.log(state?.data);
  }, []);

  const form = useForm({
    initialValues: json,
    // validate: zodResolver(schema),
    // validateInputOnChange: true,
    // validateInputOnBlur: true,
  });

  const handleSubmit = () => {
    console.log('Form submitted with values:', form.values);
  };

  return (
    <form onSubmit={form.onSubmit(() => handleSubmit())}>
      <Paper shadow="xs" radius="sm">
        <Table>
          <Table.Thead>
            <Table.Tr>
              {Object.keys(json[0]).map((item, index) => (
                <Table.Th key={index}>{item}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {/* <Table.Tr>
              <Table.Td>
                <TextInput
                  required
                  data-testid="date-input"
                  value={form.values.date}
                  onChange={(event) =>
                    form.setFieldValue('date', event.currentTarget.value)
                  }
                  error={form.errors.date}
                  radius="md"
                />
              </Table.Td>
              <Table.Td>
                <TextInput
                  required
                  data-testid="venue-input"
                  value={form.values.venue}
                  onChange={(event) =>
                    form.setFieldValue('venue', event.currentTarget.value)
                  }
                  error={form.errors.venue}
                  radius="md"
                />
              </Table.Td>
              <Table.Td>
                <TextInput
                  required
                  data-testid="name-input"
                  value={form.values.name}
                  onChange={(event) =>
                    form.setFieldValue('name', event.currentTarget.value)
                  }
                  error={form.errors.name}
                  radius="md"
                />
              </Table.Td>
              <Table.Td>
                <TextInput
                  required
                  data-testid="email-input"
                  value={form.values.email}
                  onChange={(event) =>
                    form.setFieldValue('email', event.currentTarget.value)
                  }
                  error={form.errors.email}
                  radius="md"
                />
              </Table.Td>
              <Table.Td>
                <TextInput
                  required
                  data-testid="phone-input"
                  value={form.values.phoneNumber}
                  onChange={(event) =>
                    form.setFieldValue('phoneNumber', event.currentTarget.value)
                  }
                  error={form.errors.phoneNumber}
                  radius="md"
                />
              </Table.Td>
            </Table.Tr> */}

            {form.values.map((item: any, index: any) => (
              <Table.Tr key={index}>
                <Table.Td>
                  <TextInput
                    required
                    data-testid="date-input"
                    value={item.DATE}
                    onChange={(event) =>
                      form.setFieldValue('DATE', event.currentTarget.value)
                    }
                    // error={form.errors.DATE}
                    radius="md"
                  />
                </Table.Td>
                <Table.Td>
                  <TextInput
                    required
                    data-testid="venue-input"
                    value={item.VENUE}
                    onChange={(event) =>
                      form.setFieldValue('venue', event.currentTarget.value)
                    }
                    // error={item.VENUE}
                    radius="md"
                  />
                </Table.Td>
                <Table.Td>
                  <TextInput
                    required
                    data-testid="name-input"
                    value={item.NAME}
                    onChange={(event) =>
                      form.setFieldValue('name', event.currentTarget.value)
                    }
                    // error={item.NAME}
                    radius="md"
                  />
                </Table.Td>
                <Table.Td>
                  <TextInput
                    required
                    data-testid="email-input"
                    value={item.EMAIL}
                    onChange={(event) =>
                      form.setFieldValue('email', event.currentTarget.value)
                    }
                    // error={item.EMAIL}
                    radius="md"
                  />
                </Table.Td>
                <Table.Td>
                  <TextInput
                    required
                    data-testid="phone-input"
                    value={item.NUMBER}
                    onChange={(event) =>
                      form.setFieldValue('phoneNumber', event.currentTarget.value)
                    }
                    // error={item.NUMBER}
                    radius="md"
                  />
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        <Button type="submit" fullWidth>
          Submit
        </Button>

        {form.isDirty() && !form.isValid && (
          <Text color="red" mt="sm">
            Please fill out all the required fields correctly.
          </Text>
        )}
      </Paper>
    </form>
  );
};

export default BatchEventApprove;
