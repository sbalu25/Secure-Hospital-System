package models;

import com.example.security.entity.UserDao;

import java.io.Serializable;
public class JwtResponse implements Serializable {
    private static final long serialVersionUID = -8091879091924046844L;
    private final String jwttoken;
    private final UserDao userDao;
    public JwtResponse(String jwttoken, UserDao userDao) {
        this.jwttoken = jwttoken;
        this.userDao = userDao;
    }
    public String getToken() {
        return this.jwttoken;
    }
    public UserDao getUser() {
        return this.userDao;
    }
}
