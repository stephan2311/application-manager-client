import { Link } from "react-router-dom";
import { Box, Heading, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import moment from 'moment';

function ApplicationCard({ position, dateApplied, company, _id }) {

    return (
        <div>
            <LinkBox as='article' maxW='sm' p='5' borderWidth='1px' rounded='md'>
                <Box as='time'>
                    {moment(dateApplied).fromNow()}
                </Box>
                <Heading size='md' my='2'>
                    <LinkOverlay href={`/account/applications/${_id}`}>
                        {position}
                    </LinkOverlay>
                </Heading>
                <Box as='a' color='teal.400' fontWeight='bold'>
                    {company.name}
                </Box>
            </LinkBox>
        </div>
    );
}

export default ApplicationCard;
