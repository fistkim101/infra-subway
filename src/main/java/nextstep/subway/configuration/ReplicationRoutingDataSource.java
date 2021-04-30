package nextstep.subway.configuration;

import nextstep.subway.common.Constants;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionSynchronizationManager;

@Component
public class ReplicationRoutingDataSource extends AbstractRoutingDataSource {
    @Override
    protected Object determineCurrentLookupKey() {
        boolean isReadOnly = TransactionSynchronizationManager.isCurrentTransactionReadOnly();
        return (isReadOnly)
                ? Constants.DATASOURCE_KEY_SLAVE
                : Constants.DATASOURCE_KEY_MASTER;
    }
}