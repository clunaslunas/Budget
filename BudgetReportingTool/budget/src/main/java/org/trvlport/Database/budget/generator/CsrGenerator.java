package org.trvlport.Database.budget.generator;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SessionImplementor;
import org.hibernate.id.IdentifierGenerator;

public class CsrGenerator implements IdentifierGenerator {

	@Override
	public Serializable generate(SessionImplementor session, Object object) throws HibernateException {
		String generatedId = "";
		Connection connection = session.connection();
		try {
			Statement statement = connection.createStatement();
			
			ResultSet rs = statement.executeQuery("select count(csr) as Id from Project");
			//ResultSet rs2 = statement.executeQuery("select count(id) as Id from Budget");
			if(rs.next()) {
				int id = rs.getInt(1) + 100;
				//int id2 = rs2.getInt(1) + 00;
				generatedId = new Integer(id).toString();
				return generatedId;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

}
